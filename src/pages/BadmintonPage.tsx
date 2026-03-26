import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function BadmintonPage() {
  useDocumentTitle("Fun — Zheng Chen");

  return (
    <article>
      <h1 className="mb-4 text-3xl font-semibold text-mizuno-900 dark:text-mizuno-50">Fun</h1>
      <p className="text-mizuno-800 dark:text-mizuno-200">
        Placeholder. Badminton notes, hobbies, or anything else fun can go here.
      </p>
    </article>
  );
}
