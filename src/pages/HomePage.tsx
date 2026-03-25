import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function HomePage() {
  useDocumentTitle("Zheng Chen");

  return (
    <article>
      <h1 className="mb-4 text-3xl font-semibold tracking-tight text-mizuno-900 dark:text-mizuno-50">
        Zheng Chen
      </h1>
      <p className="mb-2 text-mizuno-800 dark:text-mizuno-200">
        Hon. BSc. Computer Science Specialist &amp; Math Major, University of Toronto
      </p>
      <p className="mb-8 text-mizuno-700 dark:text-mizuno-300">2025–2026: quant development and quant research.</p>

      <section aria-labelledby="explore-heading" className="mb-10">
        <h2 id="explore-heading" className="mb-3 text-xl font-semibold text-mizuno-900 dark:text-mizuno-50">
          Explore
        </h2>
        <ul className="list-inside list-disc space-y-1 text-mizuno-800 dark:text-mizuno-200">
          <li>
            <Link
              to="/blog"
              className="text-mizuno-700 underline underline-offset-2 hover:text-mizuno-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:text-mizuno-200"
            >
              Blog
            </Link>{" "}
            — notes on ideas, phenomena, and lessons learned
          </li>
          <li>
            <Link
              to="/projects"
              className="text-mizuno-700 underline underline-offset-2 hover:text-mizuno-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:text-mizuno-200"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="/badminton"
              className="text-mizuno-700 underline underline-offset-2 hover:text-mizuno-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:text-mizuno-200"
            >
              Badminton
            </Link>
          </li>
        </ul>
      </section>

      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="mb-3 text-xl font-semibold text-mizuno-900 dark:text-mizuno-50">
          Contact
        </h2>
        <ul className="space-y-1 text-mizuno-800 dark:text-mizuno-200">
          <li>
            Email:{" "}
            <span className="font-sans">
              chenzheng0430<span aria-hidden="true"> [at] </span>
              <span className="sr-only"> at </span>
              gmail.com
            </span>
          </li>
          <li>
            GitHub:{" "}
            <a
              href="https://github.com/Kikyoyoyo/"
              className="text-mizuno-700 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:text-mizuno-200"
            >
              github.com/Kikyoyoyo
            </a>
          </li>
          <li>
            HuggingFace:{" "}
            <a
              href="https://huggingface.co/kikyoyoyo/"
              className="text-mizuno-700 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:text-mizuno-200"
            >
              huggingface.co/kikyoyoyo
            </a>
          </li>
          <li>Phone: +1 365 993 0207</li>
          <li>Phone: +86 135 0189 6430</li>
        </ul>
      </section>

      <section aria-labelledby="bio-heading" className="mt-10">
        <h2 id="bio-heading" className="mb-3 text-xl font-semibold text-mizuno-900 dark:text-mizuno-50">
          Short bio
        </h2>
        <p className="text-mizuno-800 dark:text-mizuno-200">
          Hi, I am Zheng Chen, Jack, a math &amp; CS enjoyer, badminton enthusiast, art enjoyer, philosophy reader, and
          most importantly, a genuine friend.
        </p>
        <h3 className="mt-6 mb-2 text-lg font-semibold text-mizuno-900 dark:text-mizuno-50">Bookshelf</h3>
        <ul className="list-inside list-disc space-y-1 text-mizuno-800 dark:text-mizuno-200">
          <li>
            <em>Linear Algebra Done Right</em>, 3rd ed. by Sheldon Axler
          </li>
          <li>
            <em>Contemporary Abstract Algebra</em>, 9th ed. by Joseph A. Gallian
          </li>
          <li>
            <em>A Random Walk Down Wall Street</em>, by Burton G. Malkiel
          </li>
          <li>—</li>
        </ul>
      </section>
    </article>
  );
}
