import { useCallback, useEffect, useRef, useState } from "react";
import {
  createRoom,
  deleteRoom,
  joinAsReceiver,
  onReceiverIceAdded,
  onSenderIceAdded,
  pushReceiverIce,
  pushSenderIce,
  setFileMeta,
  setPeerAnswer,
  setPeerOffer,
  setPeerStatus,
  subscribeAnswer,
  subscribeFileMeta,
  subscribeOffer,
  subscribePeers,
  type PeerSnapshot,
} from "../lib/firebase";
import {
  createPeerConnection,
  iceCandidateFromJson,
  iceCandidateToJson,
  receiveFileFromDataChannel,
  sendFileOverDataChannel,
  waitForIceGatheringComplete,
} from "../lib/webrtc";

export type TransferRole = "idle" | "sender" | "receiver";

export type ReceiverRow = {
  peerId: string;
  nickname: string;
  progress: number;
  status: string;
  error?: string;
};

function randomRoomId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 8; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

function randomPeerId(): string {
  return `p_${Math.random().toString(36).slice(2, 12)}`;
}

export function useFileTransfer() {
  const [role, setRole] = useState<TransferRole>("idle");
  const [roomId, setRoomId] = useState("");
  const [nickname, setNickname] = useState("");
  const [phase, setPhase] = useState<
    "pick-role" | "lobby" | "ready" | "transferring" | "done" | "error"
  >("pick-role");
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [remoteFileMeta, setRemoteFileMeta] = useState<{
    name: string;
    size: number;
    mimeType: string;
  } | null>(null);
  const [receiverRows, setReceiverRows] = useState<ReceiverRow[]>([]);
  const [receiverProgress, setReceiverProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string | null>(null);

  const unsubRef = useRef<Array<() => void>>([]);
  const senderMapRef = useRef(
    new Map<
      string,
      {
        pc: RTCPeerConnection;
        dc: RTCDataChannel | null;
      }
    >(),
  );
  const receiverRef = useRef<{
    pc: RTCPeerConnection;
    dc: RTCDataChannel | null;
  } | null>(null);
  const processedPeersRef = useRef(new Set<string>());

  const clearSubs = useCallback(() => {
    unsubRef.current.forEach((u) => u());
    unsubRef.current = [];
  }, []);

  const closeSenderConnections = useCallback(() => {
    senderMapRef.current.forEach(({ pc }) => pc.close());
    senderMapRef.current.clear();
    processedPeersRef.current.clear();
  }, []);

  const closeReceiver = useCallback(() => {
    const r = receiverRef.current;
    if (r) {
      r.pc.close();
      receiverRef.current = null;
    }
  }, []);

  const startAsSender = useCallback(async (nick: string) => {
    setError(null);
    const rid = randomRoomId();
    setNickname(nick.trim());
    setRoomId(rid);
    setRole("sender");
    setPhase("lobby");
    await createRoom(rid);
  }, []);

  useEffect(() => {
    if (role !== "sender" || !roomId) return;

    const rid = roomId;

    const updateRow = (peerId: string, snap: PeerSnapshot, patch: Partial<ReceiverRow>) => {
      setReceiverRows((rows) => {
        const i = rows.findIndex((r) => r.peerId === peerId);
        const base: ReceiverRow = {
          peerId,
          nickname: snap.nickname ?? "?",
          progress: 0,
          status: "joined",
        };
        if (i < 0) return [...rows, { ...base, ...patch }];
        const next = [...rows];
        next[i] = { ...next[i], ...patch };
        return next;
      });
    };

    const attachSenderPeer = async (peerId: string, snap: PeerSnapshot) => {
      if (senderMapRef.current.has(peerId)) return;
      if (!snap.nickname) return;

      const pc = createPeerConnection();
      const dc = pc.createDataChannel("file", { ordered: true });
      senderMapRef.current.set(peerId, { pc, dc });

      updateRow(peerId, snap, { nickname: snap.nickname ?? "?", status: "signaling" });

      pc.onicecandidate = (ev) => {
        if (ev.candidate) {
          void pushSenderIce(rid, peerId, iceCandidateToJson(ev.candidate));
        }
      };

      dc.onopen = () => {
        void setPeerStatus(rid, peerId, "connected");
        updateRow(peerId, snap, { status: "connected" });
      };

      dc.onerror = () => {
        updateRow(peerId, snap, { status: "error", error: "channel error" });
      };

      unsubRef.current.push(
        subscribeAnswer(rid, peerId, async (answer) => {
          if (!answer || pc.signalingState === "closed") return;
          if (pc.remoteDescription?.type === "answer") return;
          try {
            await pc.setRemoteDescription({ type: "answer", sdp: answer });
          } catch (e) {
            updateRow(peerId, snap, {
              status: "error",
              error: e instanceof Error ? e.message : "SDP error",
            });
          }
        }),
      );

      unsubRef.current.push(
        onReceiverIceAdded(rid, peerId, async (json) => {
          try {
            await pc.addIceCandidate(iceCandidateFromJson(json));
          } catch {
            /* ignore late candidates */
          }
        }),
      );

      try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        await waitForIceGatheringComplete(pc);
        const sdp = pc.localDescription?.sdp;
        if (!sdp) throw new Error("No local SDP");
        await setPeerOffer(rid, peerId, sdp);
      } catch (e) {
        processedPeersRef.current.delete(peerId);
        updateRow(peerId, snap, {
          status: "error",
          error: e instanceof Error ? e.message : "offer failed",
        });
      }
    };

    const uPeers = subscribePeers(rid, (peers) => {
      const ids = Object.keys(peers);
      setReceiverRows((prev) =>
        ids.map((id) => {
          const p = peers[id];
          const old = prev.find((r) => r.peerId === id);
          return {
            peerId: id,
            nickname: p?.nickname ?? old?.nickname ?? "?",
            progress: old?.progress ?? 0,
            status: old?.status ?? p?.status ?? "joined",
            error: old?.error,
          };
        }),
      );

      for (const peerId of ids) {
        const snap = peers[peerId];
        if (!snap?.nickname) continue;
        if (processedPeersRef.current.has(peerId)) continue;
        processedPeersRef.current.add(peerId);
        void attachSenderPeer(peerId, snap);
      }
    });
    unsubRef.current.push(uPeers);

    return () => {
      clearSubs();
      closeSenderConnections();
    };
  }, [role, roomId, clearSubs, closeSenderConnections]);

  const joinAsReceiverRole = useCallback(async (rid: string, nick: string) => {
    clearSubs();
    closeReceiver();
    setError(null);
    const pid = randomPeerId();
    const trimmed = rid.trim().toUpperCase();
    if (trimmed.length !== 8) {
      setError("Room code must be 8 characters.");
      return;
    }
    setRoomId(trimmed);
    setNickname(nick.trim());
    setRole("receiver");
    setPhase("lobby");
    await joinAsReceiver(trimmed, pid, nick.trim());

    const pc = createPeerConnection();
    receiverRef.current = { pc, dc: null };

    pc.onicecandidate = (ev) => {
      if (ev.candidate) {
        void pushReceiverIce(trimmed, pid, iceCandidateToJson(ev.candidate));
      }
    };

    pc.ondatachannel = (ev) => {
      const dc = ev.channel;
      dc.binaryType = "arraybuffer";
      receiverRef.current!.dc = dc;
      setPhase("ready");
      void receiveFileFromDataChannel(dc, (ratio) => {
          setReceiverProgress(ratio);
          if (ratio > 0) setPhase("transferring");
        })
        .then(({ blob, meta }) => {
          const url = URL.createObjectURL(blob);
          setDownloadUrl(url);
          setDownloadName(meta.name);
          setPhase("done");
          void setPeerStatus(trimmed, pid, "done");
        })
        .catch((e) => {
          setError(e instanceof Error ? e.message : "Receive failed");
          setPhase("error");
        });
    };

    unsubRef.current.push(
      subscribeOffer(trimmed, pid, async (offerSdp) => {
        if (!offerSdp || pc.signalingState === "closed") return;
        if (pc.remoteDescription?.type === "offer") return;
        try {
          await pc.setRemoteDescription({ type: "offer", sdp: offerSdp });
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          await waitForIceGatheringComplete(pc);
          const sdp = pc.localDescription?.sdp;
          if (sdp) await setPeerAnswer(trimmed, pid, sdp);
        } catch (e) {
          setError(e instanceof Error ? e.message : "Answer failed");
          setPhase("error");
        }
      }),
    );

    unsubRef.current.push(
      onSenderIceAdded(trimmed, pid, async (json) => {
        try {
          await pc.addIceCandidate(iceCandidateFromJson(json));
        } catch {
          /* ignore */
        }
      }),
    );

    unsubRef.current.push(
      subscribeFileMeta(trimmed, (m) => setRemoteFileMeta(m)),
    );
  }, [clearSubs, closeReceiver]);

  useEffect(() => {
    return () => {
      clearSubs();
      closeSenderConnections();
      closeReceiver();
    };
  }, [clearSubs, closeSenderConnections, closeReceiver]);

  const selectFile = useCallback(
    async (f: File | null) => {
      setFile(f);
      if (role === "sender" && roomId && f) {
        await setFileMeta(roomId, {
          name: f.name,
          size: f.size,
          mimeType: f.type || "application/octet-stream",
        });
        setPhase("ready");
      }
      if (!f && role === "sender" && roomId) {
        await setFileMeta(roomId, null);
        setPhase("lobby");
      }
    },
    [role, roomId],
  );

  const startTransfer = useCallback(async () => {
    if (role !== "sender" || !file) return;
    setPhase("transferring");
    const entries = [...senderMapRef.current.entries()];
    for (const [peerId, { dc }] of entries) {
      if (!dc || dc.readyState !== "open") {
        setReceiverRows((rows) =>
          rows.map((r) =>
            r.peerId === peerId
              ? { ...r, status: "error", error: "Channel not open" }
              : r,
          ),
        );
        continue;
      }
      try {
        await sendFileOverDataChannel(dc, file, (ratio) => {
          setReceiverRows((rows) =>
            rows.map((r) =>
              r.peerId === peerId ? { ...r, progress: ratio } : r,
            ),
          );
        });
        await setPeerStatus(roomId, peerId, "done");
        setReceiverRows((rows) =>
          rows.map((r) =>
            r.peerId === peerId ? { ...r, progress: 1, status: "done" } : r,
          ),
        );
      } catch (e) {
        setReceiverRows((rows) =>
          rows.map((r) =>
            r.peerId === peerId
              ? {
                  ...r,
                  status: "error",
                  error: e instanceof Error ? e.message : "send failed",
                }
              : r,
          ),
        );
      }
    }
    setPhase("done");
  }, [role, file, roomId]);

  const leaveRoom = useCallback(
    async (removeRemote: boolean) => {
      if (removeRemote && roomId) {
        try {
          await deleteRoom(roomId);
        } catch {
          /* ignore */
        }
      }
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
      setDownloadName(null);
      clearSubs();
      closeSenderConnections();
      closeReceiver();
      setFile(null);
      setRemoteFileMeta(null);
      setReceiverRows([]);
      setReceiverProgress(0);
      setError(null);
      setPhase("pick-role");
      setRoomId("");
      setNickname("");
      setRole("idle");
    },
    [roomId, downloadUrl, clearSubs, closeSenderConnections, closeReceiver],
  );

  useEffect(() => {
    const onUnload = () => {
      if (role === "sender" && roomId) {
        void deleteRoom(roomId);
      }
    };
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [role, roomId]);

  return {
    role,
    phase,
    error,
    roomId,
    nickname,
    file,
    remoteFileMeta,
    receiverRows,
    receiverProgress,
    downloadUrl,
    downloadName,
    setNickname,
    startAsSender,
    joinAsReceiverRole,
    selectFile,
    startTransfer,
    leaveRoom,
  };
}
