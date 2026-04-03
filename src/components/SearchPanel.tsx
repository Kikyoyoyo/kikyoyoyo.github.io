import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Fuse from "fuse.js";
import { getAllPosts } from "../lib/posts";
import { slugify } from "../lib/slug";

type SearchPanelProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchPanel({ open, onClose }: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const posts = getAllPosts();
  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: [
          { name: "title", weight: 2 },
          { name: "body", weight: 1 },
          { name: "category", weight: 0.5 },
          { name: "tags", weight: 0.5 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [posts],
  );

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return posts.slice(0, 12);
    return fuse.search(q).map((r) => r.item);
  }, [fuse, posts, query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-blueish-900/40 p-4 pt-[12vh] dark:bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-dialog-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-lg border border-blueish-200 bg-white p-4 shadow-xl dark:border-blueish-700 dark:bg-blueish-800"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="search-dialog-title" className="sr-only">
          Search posts
        </h2>
        <label htmlFor="site-search-input" className="mb-2 block text-sm font-sans text-blueish-700 dark:text-blueish-200">
          Search
        </label>
        <input
          id="site-search-input"
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-4 w-full rounded border border-blueish-200 bg-white px-3 py-2 font-sans text-blueish-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueish-600 dark:border-blueish-600 dark:bg-blueish-900 dark:text-blueish-50"
          placeholder="Title or content…"
          autoComplete="off"
        />
        <ul className="max-h-[50vh] overflow-y-auto font-sans text-sm">
          {results.length === 0 ? (
            <li className="text-blueish-700 dark:text-blueish-300">No matches.</li>
          ) : (
            results.map((p) => (
              <li key={p.slug} className="border-b border-blueish-100 py-2 last:border-0 dark:border-blueish-700">
                <Link
                  to={`/blog/${p.slug}`}
                  className="font-medium text-blueish-700 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueish-600 dark:text-blueish-100"
                  onClick={onClose}
                >
                  {p.title}
                </Link>
                <div className="mt-0.5 text-xs text-blueish-600 dark:text-blueish-300">
                  {p.date}{" "}
                  ·{" "}
                  <Link
                    to={`/blog/category/${slugify(p.category)}`}
                    className="underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blueish-600"
                    onClick={onClose}
                  >
                    {p.category}
                  </Link>
                </div>
              </li>
            ))
          )}
        </ul>
        <button
          type="button"
          className="mt-4 w-full rounded border border-blueish-200 px-3 py-2 font-sans text-sm text-blueish-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueish-600 dark:border-blueish-600 dark:text-blueish-100"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
