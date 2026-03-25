import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function ProjectsPage() {
  useDocumentTitle("Projects — Zheng Chen");

  return (
    <article>
      <h1 className="mb-4 text-3xl font-semibold text-mizuno-900 dark:text-mizuno-50">Projects</h1>
      <p className="text-mizuno-800 dark:text-mizuno-200">
        Placeholder. Add entries here over time (repos, demos, short descriptions).
      </p>
    </article>
  );
}
