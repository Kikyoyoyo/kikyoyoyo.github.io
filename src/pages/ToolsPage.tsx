import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function ToolsPage() {
  useDocumentTitle("Tools — Zheng Chen");

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
        <span className="text-mizuno-800 dark:text-mizuno-200">Tools</span>
      </nav>
      <h1 className="mb-4 text-3xl font-semibold text-mizuno-900 dark:text-mizuno-50">
        Tools
      </h1>
      <ul className="list-inside list-disc space-y-2 text-mizuno-800 dark:text-mizuno-200">
        <li>
          <Link
            to="/fun/tools/local-file-transfer"
            className="text-mizuno-700 underline underline-offset-2 hover:text-mizuno-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:text-mizuno-200"
          >
            Local File Transfer
          </Link>
          <span>
            {" "}
            — same Wi-Fi / LAN, WebRTC file send (1 sender → many receivers); Firebase is
            used for signaling only
          </span>
        </li>
      </ul>
    </article>
  );
}
