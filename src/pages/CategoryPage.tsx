import { Link, useParams } from "react-router-dom";
import { getAllPosts } from "../lib/posts";
import { slugify } from "../lib/slug";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const posts = getAllPosts().filter((p) => slugify(p.category) === categorySlug);
  const name = posts[0]?.category ?? categorySlug?.replace(/-/g, " ") ?? "";

  useDocumentTitle(name ? `Category: ${name} — Kikyoyoyo` : "Category — Kikyoyoyo");

  if (!categorySlug || posts.length === 0) {
    return (
      <article>
        <h1 className="text-2xl font-semibold">Category not found</h1>
        <p className="mt-4">
          <Link
            to="/blog"
            className="text-blueish-700 underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueish-600 dark:text-blueish-200"
          >
            Back to blog
          </Link>
        </p>
      </article>
    );
  }

  return (
    <article>
      <h1 className="mb-2 text-3xl font-semibold text-blueish-900 dark:text-blueish-50">Category: {name}</h1>
      <p className="mb-8 font-sans text-sm text-blueish-600 dark:text-blueish-400">{posts.length} post(s)</p>
      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              to={`/blog/${p.slug}`}
              className="text-lg font-medium text-blueish-800 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueish-600 dark:text-blueish-100"
            >
              {p.title}
            </Link>
            <p className="font-sans text-sm text-blueish-600 dark:text-blueish-400">{p.date}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
