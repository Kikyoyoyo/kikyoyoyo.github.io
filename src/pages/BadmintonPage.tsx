import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function BadmintonPage() {
  useDocumentTitle("Badminton — Zheng Chen");

  return (
    <article>
      <h1 className="mb-4 text-3xl font-semibold text-mizuno-900 dark:text-mizuno-50">Badminton</h1>
      <p className="text-mizuno-800 dark:text-mizuno-200">
        Placeholder. Notes, schedule, or fun facts about badminton can go here.
      </p>
    </article>
  );
}
