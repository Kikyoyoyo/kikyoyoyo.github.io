import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug } from "../lib/posts";
import { slugify } from "../lib/slug";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useDocumentTitle(post ? `${post.title} — Zheng Chen` : "Not found — Zheng Chen");

  if (!post) {
    return (
      <article>
        <h1 className="text-2xl font-semibold">Not found</h1>
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
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-blueish-900 dark:text-blueish-50">{post.title}</h1>
        <p className="mt-2 font-sans text-sm text-blueish-600 dark:text-blueish-400">
          {post.date} ·{" "}
          <Link
            to={`/blog/category/${slugify(post.category)}`}
            className="underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blueish-600"
          >
            {post.category}
          </Link>
          {post.tags.length > 0 && (
            <>
              {" "}
              ·{" "}
              {post.tags.map((t, i) => (
                <span key={t}>
                  {i > 0 && ", "}
                  <Link
                    to={`/blog/tag/${slugify(t)}`}
                    className="underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blueish-600"
                  >
                    {t}
                  </Link>
                </span>
              ))}
            </>
          )}
        </p>
      </header>
      <div className="prose-blueish max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href, children, ...props }) => (
              <a
                href={href}
                className="text-blueish-700 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueish-600 dark:text-blueish-300"
                {...props}
              >
                {children}
              </a>
            ),
          }}
        >
          {post.body}
        </ReactMarkdown>
      </div>
      <p className="mt-10 border-t border-blueish-200 pt-6 dark:border-blueish-700">
        <Link
          to="/blog"
          className="font-sans text-blueish-700 underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueish-600 dark:text-blueish-200"
        >
          ← All posts
        </Link>
      </p>
    </article>
  );
}
