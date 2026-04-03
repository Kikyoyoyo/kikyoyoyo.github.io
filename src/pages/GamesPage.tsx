import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function GamesPage() {
  useDocumentTitle("Games — Zheng Chen");

  return (
    <article>
      <nav aria-label="Breadcrumb" className="mb-4 font-sans text-sm text-blueish-600 dark:text-blueish-400">
        <Link
          to="/fun"
          className="underline underline-offset-2 hover:text-blueish-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueish-600 dark:hover:text-blueish-200"
        >
          Fun
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-blueish-800 dark:text-blueish-200">Games</span>
      </nav>
      <h1 className="mb-4 text-3xl font-semibold text-blueish-900 dark:text-blueish-50">
        Games
      </h1>
      <ul className="list-inside list-disc space-y-2 text-blueish-800 dark:text-blueish-200">
        <li>
          <Link
            to="/fun/games/gomoku"
            className="text-blueish-700 underline underline-offset-2 hover:text-blueish-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueish-600 dark:text-blueish-200"
          >
            Gomoku (五子棋)
          </Link>
          <span> — two-player, 19×19, same device</span>
        </li>
      </ul>
    </article>
  );
}
