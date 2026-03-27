import { Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function GamesPage() {
  useDocumentTitle("Games — Zheng Chen");

  return (
    <article>
      <nav aria-label="Breadcrumb" className="mb-4 font-sans text-sm text-mizuno-600 dark:text-mizuno-400">
        <Link
          to="/fun"
          className="underline underline-offset-2 hover:text-mizuno-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:hover:text-mizuno-200"
        >
          Fun
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-mizuno-800 dark:text-mizuno-200">Games</span>
      </nav>
      <h1 className="mb-4 flex items-center gap-3 text-3xl font-semibold tracking-tight text-mizuno-900 dark:text-mizuno-50">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-mizuno-100 text-mizuno-600 dark:bg-mizuno-800/80 dark:text-mizuno-400"
          aria-hidden
        >
          <Gamepad2 className="h-7 w-7" strokeWidth={1.75} />
        </span>
        Games
      </h1>
      <ul className="list-inside list-disc space-y-2 text-mizuno-800 dark:text-mizuno-200">
        <li>
          <Link
            to="/fun/games/gomoku"
            className="text-mizuno-700 underline underline-offset-2 hover:text-mizuno-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:text-mizuno-200"
          >
            Gomoku (五子棋)
          </Link>
          <span> — two-player, 19×19, same device</span>
        </li>
      </ul>
    </article>
  );
}
