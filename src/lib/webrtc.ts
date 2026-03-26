export const DEFAULT_ICE_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun.cloudflare.com:3478" },
];

const CHUNK_SIZE = 64 * 1024;
const BUFFER_HIGH = 1024 * 1024;

export function createPeerConnection(): RTCPeerConnection {
  return new RTCPeerConnection({ iceServers: DEFAULT_ICE_SERVERS });
}

export function iceCandidateToJson(c: RTCIceCandidate): string {
  return JSON.stringify(c.toJSON());
}

export function iceCandidateFromJson(json: string): RTCIceCandidateInit {
  return JSON.parse(json) as RTCIceCandidateInit;
}

export async function waitForIceGatheringComplete(pc: RTCPeerConnection): Promise<void> {
  if (pc.iceGatheringState === "complete") return;
  await new Promise<void>((resolve) => {
    const done = () => {
      pc.removeEventListener("icegatheringstatechange", check);
      resolve();
    };
    const check = () => {
      if (pc.iceGatheringState === "complete") done();
    };
    pc.addEventListener("icegatheringstatechange", check);
    setTimeout(done, 5000);
  });
}

export async function sendFileOverDataChannel(
  dc: RTCDataChannel,
  file: File,
  onProgress: (ratio: number) => void,
): Promise<void> {
  const meta = {
    type: "meta" as const,
    name: file.name,
    size: file.size,
    mimeType: file.type || "application/octet-stream",
  };
  dc.send(JSON.stringify(meta));

  let offset = 0;
  while (offset < file.size) {
    while (dc.bufferedAmount > BUFFER_HIGH) {
      await new Promise((r) => setTimeout(r, 20));
    }
    const end = Math.min(offset + CHUNK_SIZE, file.size);
    const buf = await file.slice(offset, end).arrayBuffer();
    dc.send(buf);
    offset = end;
    onProgress(offset / file.size);
  }
}

export type ReceivedFileMeta = {
  name: string;
  size: number;
  mimeType: string;
};

export function receiveFileFromDataChannel(
  dc: RTCDataChannel,
  onProgress: (ratio: number) => void,
): Promise<{ blob: Blob; meta: ReceivedFileMeta }> {
  return new Promise((resolve, reject) => {
    let meta: ReceivedFileMeta | null = null;
    let received = 0;
    const chunks: BlobPart[] = [];

    dc.onmessage = (ev) => {
      const data = ev.data;
      if (typeof data === "string") {
        try {
          const parsed = JSON.parse(data) as { type?: string; name?: string; size?: number; mimeType?: string };
          if (parsed.type === "meta" && parsed.name != null && parsed.size != null) {
            meta = {
              name: parsed.name,
              size: parsed.size,
              mimeType: parsed.mimeType || "application/octet-stream",
            };
          }
        } catch {
          reject(new Error("Invalid meta message"));
        }
        return;
      }
      if (data instanceof ArrayBuffer) {
        if (!meta) {
          reject(new Error("Chunk before meta"));
          return;
        }
        chunks.push(data);
        received += data.byteLength;
        onProgress(received / meta.size);
        if (received >= meta.size) {
          dc.onmessage = null;
          resolve({
            blob: new Blob(chunks, { type: meta.mimeType }),
            meta,
          });
        }
        return;
      }
      if (data instanceof Blob) {
        data.arrayBuffer().then((ab) => {
          if (!meta) {
            reject(new Error("Chunk before meta"));
            return;
          }
          chunks.push(ab);
          received += ab.byteLength;
          onProgress(received / meta.size);
          if (received >= meta.size) {
            dc.onmessage = null;
            resolve({
              blob: new Blob(chunks, { type: meta!.mimeType }),
              meta: meta!,
            });
          }
        });
        return;
      }
    };

    dc.onerror = () => reject(new Error("Data channel error"));
  });
}
