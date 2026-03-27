import { Link } from "react-router-dom";
import { BadmintonIcon } from "../components/icons/BadmintonIcon";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function SportsPage() {
  useDocumentTitle("Sports — Zheng Chen");

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
        <span className="text-mizuno-800 dark:text-mizuno-200">Sports</span>
      </nav>
      <h1 className="mb-4 flex items-center gap-3 text-3xl font-semibold tracking-tight text-mizuno-900 dark:text-mizuno-50">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-mizuno-100 text-mizuno-600 dark:bg-mizuno-800/80 dark:text-mizuno-400"
          aria-hidden
        >
          <BadmintonIcon className="h-7 w-7" strokeWidth={1.75} />
        </span>
        Sports
      </h1>
      <p className="mb-6 text-mizuno-800 dark:text-mizuno-200">
        Notes and links about sports (starting with badminton) can live here.
      </p>
      <p className="text-mizuno-600 dark:text-mizuno-400">
        Nothing listed yet — check back later.
      </p>
    </article>
  );
}
