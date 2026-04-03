import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function NotFoundPage() {
  useDocumentTitle("Not found — Zheng Chen");

  return (
    <article>
      <h1 className="text-2xl font-semibold text-blueish-900 dark:text-blueish-50">Page not found</h1>
      <p className="mt-4 text-blueish-800 dark:text-blueish-200">
        <Link
          to="/"
          className="text-blueish-700 underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueish-600 dark:text-blueish-200"
        >
          Go home
        </Link>
      </p>
    </article>
  );
}
