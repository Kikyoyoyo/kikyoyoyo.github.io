import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function ProjectsPage() {
  useDocumentTitle("Projects — Zheng Chen");

  return (
    <article>
      <h1 className="mb-4 text-3xl font-semibold text-blueish-900 dark:text-blueish-50">Projects</h1>
      <p className="text-blueish-800 dark:text-blueish-200">
        Placeholder. Add entries here over time (repos, demos, short descriptions).
      </p>
    </article>
  );
}
