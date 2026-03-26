import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useFileTransfer } from "../hooks/useFileTransfer";
import { isFirebaseConfigured } from "../lib/firebase";

const MB10 = 10 * 1024 * 1024;

export function LocalFileTransferPage() {
  useDocumentTitle("Local File Transfer — Zheng Chen");

  const configured = isFirebaseConfigured();
  const [nickInput, setNickInput] = useState("");
  const [roomInput, setRoomInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ft = useFileTransfer();

  if (!configured) {
    return (
      <article>
        <nav
          aria-label="Breadcrumb"
          className="mb-4 font-sans text-sm text-mizuno-600 dark:text-mizuno-400"
        >
          <Link
            to="/fun"
            className="underline underline-offset-2 hover:text-mizuno-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:hover:text-mizuno-200"
          >
            Fun
          </Link>
          <span aria-hidden="true"> / </span>
          <Link
            to="/fun/tools"
            className="underline underline-offset-2 hover:text-mizuno-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:hover:text-mizuno-200"
          >
            Tools
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-mizuno-800 dark:text-mizuno-200">
            Local File Transfer
          </span>
        </nav>
        <h1 className="mb-4 text-3xl font-semibold text-mizuno-900 dark:text-mizuno-50">
          Local File Transfer
        </h1>
        <p className="text-mizuno-800 dark:text-mizuno-200">
          Firebase is not configured for this build. Add{" "}
          <code className="rounded bg-mizuno-100 px-1 dark:bg-mizuno-800">
            VITE_FIREBASE_* 
          </code>{" "}
          variables (see <code className="rounded bg-mizuno-100 px-1 dark:bg-mizuno-800">dev.md</code>
          ) and rebuild.
        </p>
      </article>
    );
  }

  const linkClass =
    "text-mizuno-700 underline underline-offset-2 hover:text-mizuno-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:text-mizuno-200";

  return (
    <article>
      <nav
        aria-label="Breadcrumb"
        className="mb-4 font-sans text-sm text-mizuno-600 dark:text-mizuno-400"
      >
        <Link to="/fun" className={linkClass}>
          Fun
        </Link>
        <span aria-hidden="true"> / </span>
        <Link to="/fun/tools" className={linkClass}>
          Tools
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-mizuno-800 dark:text-mizuno-200">
          Local File Transfer
        </span>
      </nav>

      <h1 className="mb-4 text-3xl font-semibold text-mizuno-900 dark:text-mizuno-50">
        Local File Transfer
      </h1>

      <p className="mb-6 max-w-2xl text-mizuno-800 dark:text-mizuno-200">
        Send one file to everyone on the same room code. Signaling goes through Firebase
        Realtime Database; the file bytes use WebRTC (DTLS) peer-to-peer when the network
        allows. Works best on trusted same Wi-Fi LAN; AP isolation or strict firewalls may
        block connections (try another network or TURN later).
      </p>

      {ft.phase === "pick-role" && ft.role === "idle" && (
        <div className="max-w-md space-y-6">
          <div>
            <label
              htmlFor="lft-nick"
              className="mb-1 block text-sm font-medium text-mizuno-900 dark:text-mizuno-100"
            >
              Nickname
            </label>
            <input
              id="lft-nick"
              type="text"
              value={nickInput}
              onChange={(e) => setNickInput(e.target.value)}
              maxLength={32}
              placeholder="How others see you"
              className="w-full rounded border border-mizuno-300 bg-white px-3 py-2 text-mizuno-900 dark:border-mizuno-600 dark:bg-mizuno-900 dark:text-mizuno-50"
            />
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-mizuno-900 dark:text-mizuno-50">
              Send
            </h2>
            <button
              type="button"
              disabled={!nickInput.trim()}
              onClick={() => void ft.startAsSender(nickInput)}
              className="rounded bg-mizuno-600 px-4 py-2 text-white hover:bg-mizuno-700 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600"
            >
              Create room &amp; send a file
            </button>
            <p className="mt-2 text-sm text-mizuno-600 dark:text-mizuno-400">
              You get an 8‑character room code to share with receivers on this page.
            </p>
          </div>

          <div className="border-t border-mizuno-200 pt-6 dark:border-mizuno-700">
            <h2 className="mb-2 text-lg font-semibold text-mizuno-900 dark:text-mizuno-50">
              Receive
            </h2>
            <label htmlFor="lft-room" className="mb-1 block text-sm font-medium">
              Room code (from sender)
            </label>
            <input
              id="lft-room"
              type="text"
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value.toUpperCase())}
              maxLength={8}
              placeholder="ABCD1234"
              className="mb-3 w-full rounded border border-mizuno-300 bg-white px-3 py-2 uppercase tracking-widest dark:border-mizuno-600 dark:bg-mizuno-900"
            />
            <button
              type="button"
              disabled={!nickInput.trim() || roomInput.trim().length !== 8}
              onClick={() => void ft.joinAsReceiverRole(roomInput, nickInput)}
              className="rounded bg-mizuno-600 px-4 py-2 text-white hover:bg-mizuno-700 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600"
            >
              Join room
            </button>
          </div>
        </div>
      )}

      {ft.role === "sender" && (
        <div className="space-y-4">
          <p className="text-mizuno-800 dark:text-mizuno-200">
            <span className="font-medium">Room code:</span>{" "}
            <span className="font-mono text-lg tracking-widest">{ft.roomId}</span>{" "}
            <button
              type="button"
              onClick={() => void navigator.clipboard.writeText(ft.roomId)}
              className="ml-2 text-sm underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Copy
            </button>
          </p>
          <p className="text-sm text-mizuno-600 dark:text-mizuno-400">
            Share this code with receivers on the same page (Receive + Join room).
          </p>

          <div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                void ft.selectFile(f);
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded border border-mizuno-600 px-4 py-2 text-mizuno-700 dark:text-mizuno-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Choose file
            </button>
            {ft.file && (
              <span className="ml-3 text-mizuno-800 dark:text-mizuno-200">
                {ft.file.name} ({(ft.file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            )}
          </div>
          {ft.file && ft.file.size > MB10 && (
            <p className="text-amber-800 dark:text-amber-200">
              This file is over 10 MB. Transfer may still work, but mobile browsers can run
              out of memory — prefer smaller files for now.
            </p>
          )}

          <div>
            <h2 className="mb-2 font-semibold text-mizuno-900 dark:text-mizuno-50">
              Receivers ({ft.receiverRows.length})
            </h2>
            <ul className="space-y-2">
              {ft.receiverRows.length === 0 && (
                <li className="text-mizuno-600 dark:text-mizuno-400">Waiting for someone to join…</li>
              )}
              {ft.receiverRows.map((r) => (
                <li
                  key={r.peerId}
                  className="rounded border border-mizuno-200 px-3 py-2 dark:border-mizuno-700"
                >
                  <div className="flex justify-between gap-2">
                    <span>{r.nickname}</span>
                    <span className="text-sm text-mizuno-600 dark:text-mizuno-400">
                      {r.status}
                      {r.error ? ` — ${r.error}` : ""}
                    </span>
                  </div>
                  <div
                    className="mt-1 h-2 overflow-hidden rounded bg-mizuno-100 dark:bg-mizuno-800"
                    role="progressbar"
                    aria-valuenow={Math.round(r.progress * 100)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="h-full bg-mizuno-600 transition-[width]"
                      style={{ width: `${Math.round(r.progress * 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {ft.receiverRows.length > 0 &&
            !ft.receiverRows.every((r) => r.status === "connected") &&
            ft.phase !== "transferring" && (
              <p className="text-sm text-mizuno-600 dark:text-mizuno-400">
                Wait until every receiver shows status <strong>connected</strong> (WebRTC data
                channel open), then send.
              </p>
            )}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={
                !ft.file ||
                ft.receiverRows.length === 0 ||
                ft.phase === "transferring" ||
                !ft.receiverRows.every((r) => r.status === "connected")
              }
              onClick={() => void ft.startTransfer()}
              className="rounded bg-mizuno-600 px-4 py-2 text-white hover:bg-mizuno-700 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600"
            >
              Send to all connected
            </button>
            <button
              type="button"
              onClick={() => void ft.leaveRoom(true)}
              className="rounded px-4 py-2 text-mizuno-700 underline dark:text-mizuno-300"
            >
              Leave & delete room
            </button>
          </div>
        </div>
      )}

      {ft.role === "receiver" && (
        <div className="space-y-4">
          <p className="text-mizuno-800 dark:text-mizuno-200">
            Room <span className="font-mono tracking-widest">{ft.roomId}</span> — as{" "}
            <span className="font-medium">{ft.nickname}</span>
          </p>
          {ft.remoteFileMeta && (
            <p className="text-mizuno-800 dark:text-mizuno-200">
              File: {ft.remoteFileMeta.name} (
              {(ft.remoteFileMeta.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
          {ft.phase === "lobby" && (
            <p className="text-mizuno-600 dark:text-mizuno-400">Connecting to sender…</p>
          )}
          {ft.phase === "ready" && (
            <p className="text-mizuno-600 dark:text-mizuno-400">Waiting for the file…</p>
          )}
          {(ft.phase === "transferring" || (ft.receiverProgress > 0 && ft.phase !== "done")) && (
            <div>
              <p className="mb-1 text-sm">Receiving…</p>
              <div
                className="h-2 max-w-md overflow-hidden rounded bg-mizuno-100 dark:bg-mizuno-800"
                role="progressbar"
                aria-valuenow={Math.round(ft.receiverProgress * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full bg-mizuno-600"
                  style={{ width: `${Math.round(ft.receiverProgress * 100)}%` }}
                />
              </div>
            </div>
          )}
          {ft.phase === "done" && ft.downloadUrl && (
            <p>
              <a
                href={ft.downloadUrl}
                download={ft.downloadName ?? "download"}
                className={linkClass}
              >
                Download file
              </a>
            </p>
          )}
          <button
            type="button"
            onClick={() => void ft.leaveRoom(false)}
            className="rounded px-4 py-2 text-mizuno-700 underline dark:text-mizuno-300"
          >
            Leave
          </button>
        </div>
      )}

      {ft.error && (
        <p className="mt-4 text-red-700 dark:text-red-300" role="alert">
          {ft.error}
        </p>
      )}
    </article>
  );
}
