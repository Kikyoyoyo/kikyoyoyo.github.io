import { Link } from "react-router-dom";
import { getAllPosts } from "../lib/posts";
import { slugify } from "../lib/slug";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

function monthKey(dateStr: string): string {
  return dateStr.slice(0, 7);
}

function monthLabel(key: string): string {
  const [y, m] = key.split("-");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const mi = Number.parseInt(m, 10) - 1;
  return `${monthNames[mi] ?? m} ${y}`;
}

export function ArchivePage() {
  useDocumentTitle("Archive — Kikyoyoyo");
  const posts = getAllPosts();
  const byMonth = new Map<string, typeof posts>();
  for (const p of posts) {
    const k = monthKey(p.date);
    const list = byMonth.get(k) ?? [];
    list.push(p);
    byMonth.set(k, list);
  }
  const months = [...byMonth.keys()].sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));

  return (
    <article>
      <h1 className="mb-6 text-3xl font-semibold text-blueish-900 dark:text-blueish-50">Archive</h1>
      <p className="mb-8 text-blueish-700 dark:text-blueish-300">Posts grouped by month (newest months first).</p>
      {months.length === 0 ? (
        <p className="text-blueish-700 dark:text-blueish-300">No posts yet.</p>
      ) : (
        months.map((m) => (
          <section key={m} className="mb-10" aria-labelledby={`month-${m}`}>
            <h2 id={`month-${m}`} className="mb-3 text-xl font-semibold text-blueish-900 dark:text-blueish-50">
              {monthLabel(m)}
            </h2>
            <ul className="space-y-2">
              {byMonth.get(m)!.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/blog/${p.slug}`}
                    className="text-blueish-800 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueish-600 dark:text-blueish-100"
                  >
                    {p.title}
                  </Link>
                  <span className="ml-2 font-sans text-sm text-blueish-600 dark:text-blueish-400">
                    ·{" "}
                    <Link
                      to={`/blog/category/${slugify(p.category)}`}
                      className="underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blueish-600"
                    >
                      {p.category}
                    </Link>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </article>
  );
}
