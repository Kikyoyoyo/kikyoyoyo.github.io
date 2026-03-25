import { Link } from "react-router-dom";
import { getAllPosts } from "../lib/posts";
import { slugify } from "../lib/slug";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function BlogPage() {
  useDocumentTitle("Blog — Zheng Chen");
  const posts = getAllPosts();

  return (
    <article>
      <h1 className="mb-6 text-3xl font-semibold text-mizuno-900 dark:text-mizuno-50">Blog</h1>
      <p className="mb-8 text-mizuno-700 dark:text-mizuno-300">
        Short notes on thinking, interesting phenomena, and things I have learned the hard way.{" "}
        <Link
          to="/blog/archive"
          className="text-mizuno-700 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:text-mizuno-200"
        >
          Archive
        </Link>
        .
      </p>
      <ul className="space-y-6">
        {posts.map((p) => (
          <li key={p.slug} className="border-b border-mizuno-200 pb-6 last:border-0 dark:border-mizuno-700">
            <h2 className="text-xl font-semibold">
              <Link
                to={`/blog/${p.slug}`}
                className="text-mizuno-800 hover:text-mizuno-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:text-mizuno-100 dark:hover:text-white"
              >
                {p.title}
              </Link>
            </h2>
            <p className="mt-1 font-sans text-sm text-mizuno-600 dark:text-mizuno-400">
              {p.date} ·{" "}
              <Link
                to={`/blog/category/${slugify(p.category)}`}
                className="underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-mizuno-600"
              >
                {p.category}
              </Link>
              {p.tags.length > 0 && (
                <>
                  {" "}
                  ·{" "}
                  {p.tags.map((t, i) => (
                    <span key={t}>
                      {i > 0 && ", "}
                      <Link
                        to={`/blog/tag/${slugify(t)}`}
                        className="underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-mizuno-600"
                      >
                        {t}
                      </Link>
                    </span>
                  ))}
                </>
              )}
            </p>
            {p.description && <p className="mt-2 text-mizuno-800 dark:text-mizuno-200">{p.description}</p>}
          </li>
        ))}
      </ul>
      {posts.length === 0 && (
        <p className="text-mizuno-700 dark:text-mizuno-300">No posts yet. Add Markdown files under src/content/posts/.</p>
      )}
    </article>
  );
}
