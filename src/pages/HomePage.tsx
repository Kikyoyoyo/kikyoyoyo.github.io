import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function HomePage() {
  useDocumentTitle("Zheng Chen");

  return (
    <article>
      <h1 className="mb-4 text-3xl font-semibold tracking-tight text-mizuno-900 dark:text-mizuno-50">
        Zheng Chen
      </h1>
      <p className="mb-8 text-mizuno-800 dark:text-mizuno-200">
        Hon. BSc. Computer Science Specialist &amp; Math Major, University of
        Toronto. Currently doing quant development and quant research.</p>
      <p className="mb-8 text-mizuno-800 dark:text-mizuno-200">I am a math &amp; CS enjoyer, badminton enthusiast, art enjoyer, philosophy reader, and
        most importantly, a genuine friend.
      </p>

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
              Fun
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
      </ul>
    </section>
    </article>
  );
}
