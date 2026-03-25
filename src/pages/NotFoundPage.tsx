import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function NotFoundPage() {
  useDocumentTitle("Not found — Zheng Chen");

  return (
    <article>
      <h1 className="text-2xl font-semibold text-mizuno-900 dark:text-mizuno-50">Page not found</h1>
      <p className="mt-4 text-mizuno-800 dark:text-mizuno-200">
        <Link
          to="/"
          className="text-mizuno-700 underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:text-mizuno-200"
        >
          Go home
        </Link>
      </p>
    </article>
  );
}
