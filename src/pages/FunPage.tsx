import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function FunPage() {
  useDocumentTitle("Fun — Zheng Chen");

  return (
    <article>
      <h1 className="mb-4 text-3xl font-semibold text-blueish-900 dark:text-blueish-50">
        Fun
      </h1>
      <p className="mb-6 text-blueish-800 dark:text-blueish-200">
        Small side projects, games, and notes that do not fit elsewhere.
      </p>
      <ul className="space-y-2 text-blueish-800 dark:text-blueish-200">
        <li>
          <Link
            to="/fun/games"
            className="text-blueish-700 underline underline-offset-2 hover:text-blueish-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueish-600 dark:text-blueish-200"
          >
            Games
          </Link>
          <span className="text-blueish-600 dark:text-blueish-400"> — </span>
          board games in the browser (two-player, local)
        </li>
        <li>
          <span className="text-blueish-700 dark:text-blueish-300">Badminton</span>
          <span className="text-blueish-600 dark:text-blueish-400"> — </span>
          placeholder for notes or links later
        </li>
        <li>
          <Link
            to="/fun/colors"
            className="text-blueish-700 underline underline-offset-2 hover:text-blueish-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueish-600 dark:text-blueish-200"
          >
            Color lab
          </Link>
          <span className="text-blueish-600 dark:text-blueish-400"> — </span>
          preview <code className="font-mono text-sm">blueish</code> palette &amp; header strips
        </li>
      </ul>
    </article>
  );
}
