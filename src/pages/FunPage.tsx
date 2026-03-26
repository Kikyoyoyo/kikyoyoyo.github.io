import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function FunPage() {
  useDocumentTitle("Fun — Zheng Chen");

  return (
    <article>
      <h1 className="mb-4 text-3xl font-semibold text-mizuno-900 dark:text-mizuno-50">
        Fun
      </h1>
      <p className="mb-6 text-mizuno-800 dark:text-mizuno-200">
        Sounds like Fun!
      </p>
      <ul className="space-y-2 text-mizuno-800 dark:text-mizuno-200">
        <li>
          <Link
            to="/fun/games"
            className="text-mizuno-700 underline underline-offset-2 hover:text-mizuno-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:text-mizuno-200"
          >
            Games
          </Link>
          <span className="text-mizuno-600 dark:text-mizuno-400"> — </span>
          board games in the browser (two-player, local)
        </li>
        <li>
          <Link
            to="/fun/tools"
            className="text-mizuno-700 underline underline-offset-2 hover:text-mizuno-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:text-mizuno-200"
          >
            Tools
          </Link>
          <span className="text-mizuno-600 dark:text-mizuno-400"> — </span>
          utilities (e.g. same-LAN file transfer via WebRTC)
        </li>
        <li>
          <span className="text-mizuno-700 dark:text-mizuno-300">Badminton</span>
          <span className="text-mizuno-600 dark:text-mizuno-400"> — </span>
          placeholder for notes or links later
        </li>
      </ul>
    </article>
  );
}
