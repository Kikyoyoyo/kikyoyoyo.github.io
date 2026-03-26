import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  push,
  remove,
  onValue,
  onChildAdded,
  update,
  type DatabaseReference,
  type Unsubscribe,
} from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.databaseURL &&
      firebaseConfig.projectId,
  );
}

let app: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase env vars are not set");
  }
  if (!app) {
    app = getApps().length > 0 ? getApps()[0]! : initializeApp(firebaseConfig);
  }
  return app;
}

export function getDb() {
  return getDatabase(getFirebaseApp());
}

export function roomRef(roomId: string): DatabaseReference {
  return ref(getDb(), `rooms/${roomId}`);
}

export function peerRef(roomId: string, peerId: string): DatabaseReference {
  return ref(getDb(), `rooms/${roomId}/peers/${peerId}`);
}

export async function createRoom(roomId: string): Promise<void> {
  await set(roomRef(roomId), {
    createdAt: Date.now(),
  });
}

export async function setFileMeta(
  roomId: string,
  meta: { name: string; size: number; mimeType: string } | null,
): Promise<void> {
  const r = ref(getDb(), `rooms/${roomId}/fileMeta`);
  if (meta === null) {
    await remove(r);
  } else {
    await set(r, meta);
  }
}

export function subscribeFileMeta(
  roomId: string,
  cb: (meta: { name: string; size: number; mimeType: string } | null) => void,
): Unsubscribe {
  const r = ref(getDb(), `rooms/${roomId}/fileMeta`);
  return onValue(r, (snap) => {
    cb(snap.exists() ? (snap.val() as { name: string; size: number; mimeType: string }) : null);
  });
}

export async function joinAsReceiver(
  roomId: string,
  peerId: string,
  nickname: string,
): Promise<void> {
  await set(peerRef(roomId, peerId), {
    nickname,
    joinedAt: Date.now(),
    status: "joined",
  });
}

export async function setPeerOffer(
  roomId: string,
  peerId: string,
  offer: string,
): Promise<void> {
  await update(peerRef(roomId, peerId), { offer, status: "signaling" });
}

export async function setPeerAnswer(
  roomId: string,
  peerId: string,
  answer: string,
): Promise<void> {
  await update(peerRef(roomId, peerId), { answer });
}

export async function setPeerStatus(
  roomId: string,
  peerId: string,
  status: string,
): Promise<void> {
  await update(peerRef(roomId, peerId), { status });
}

export async function pushSenderIce(
  roomId: string,
  peerId: string,
  candidateJson: string,
): Promise<void> {
  await push(ref(getDb(), `rooms/${roomId}/peers/${peerId}/senderIce`), candidateJson);
}

export async function pushReceiverIce(
  roomId: string,
  peerId: string,
  candidateJson: string,
): Promise<void> {
  await push(ref(getDb(), `rooms/${roomId}/peers/${peerId}/receiverIce`), candidateJson);
}

export function subscribePeers(
  roomId: string,
  cb: (peers: Record<string, PeerSnapshot>) => void,
): Unsubscribe {
  const r = ref(getDb(), `rooms/${roomId}/peers`);
  return onValue(r, (snap) => {
    cb(snap.exists() ? (snap.val() as Record<string, PeerSnapshot>) : {});
  });
}

export type PeerSnapshot = {
  nickname?: string;
  joinedAt?: number;
  offer?: string | null;
  answer?: string | null;
  status?: string;
};

export function subscribeOffer(
  roomId: string,
  peerId: string,
  cb: (offer: string | null) => void,
): Unsubscribe {
  const r = ref(getDb(), `rooms/${roomId}/peers/${peerId}/offer`);
  return onValue(r, (snap) => {
    cb(snap.exists() ? String(snap.val()) : null);
  });
}

export function subscribeAnswer(
  roomId: string,
  peerId: string,
  cb: (answer: string | null) => void,
): Unsubscribe {
  const r = ref(getDb(), `rooms/${roomId}/peers/${peerId}/answer`);
  return onValue(r, (snap) => {
    cb(snap.exists() ? String(snap.val()) : null);
  });
}

export function onSenderIceAdded(
  roomId: string,
  peerId: string,
  cb: (json: string) => void,
): Unsubscribe {
  const r = ref(getDb(), `rooms/${roomId}/peers/${peerId}/senderIce`);
  return onChildAdded(r, (snap) => {
    cb(String(snap.val()));
  });
}

export function onReceiverIceAdded(
  roomId: string,
  peerId: string,
  cb: (json: string) => void,
): Unsubscribe {
  const r = ref(getDb(), `rooms/${roomId}/peers/${peerId}/receiverIce`);
  return onChildAdded(r, (snap) => {
    cb(String(snap.val()));
  });
}

export async function deleteRoom(roomId: string): Promise<void> {
  await remove(roomRef(roomId));
}
