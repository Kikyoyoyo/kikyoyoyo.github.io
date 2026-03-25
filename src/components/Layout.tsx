import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { SearchPanel } from "./SearchPanel";
import { UmamiScript } from "./Umami";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded px-2 py-1 font-sans text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600",
    isActive
      ? "bg-mizuno-200 font-semibold text-mizuno-900 dark:bg-mizuno-700 dark:text-mizuno-50"
      : "text-mizuno-800 hover:bg-mizuno-100 dark:text-mizuno-100 dark:hover:bg-mizuno-800",
  ].join(" ");

export function Layout({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <UmamiScript />
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:inline-block focus:h-auto focus:w-auto focus:overflow-visible focus:rounded focus:bg-mizuno-600 focus:px-3 focus:py-2 focus:font-sans focus:text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
      >
        Skip to main content
      </a>
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-40 border-b border-mizuno-200 bg-mizuno-50/95 backdrop-blur dark:border-mizuno-700 dark:bg-mizuno-900/95">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-3">
            <Link
              to="/"
              className="flex items-center gap-2 font-sans text-lg font-semibold text-mizuno-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:text-mizuno-50"
            >
              <Logo />
              <span>Zheng Chen</span>
            </Link>
            <nav aria-label="Primary" className="flex flex-wrap items-center gap-1">
              <NavLink to="/" className={navLinkClass} end>
                Home
              </NavLink>
              <NavLink to="/blog" className={navLinkClass}>
                Blog
              </NavLink>
              <NavLink to="/blog/archive" className={navLinkClass}>
                Archive
              </NavLink>
              <NavLink to="/projects" className={navLinkClass}>
                Projects
              </NavLink>
              <NavLink to="/badminton" className={navLinkClass}>
                Badminton
              </NavLink>
              <button
                type="button"
                className="rounded px-2 py-1 font-sans text-sm text-mizuno-800 hover:bg-mizuno-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:text-mizuno-100 dark:hover:bg-mizuno-800"
                onClick={() => setSearchOpen(true)}
                aria-expanded={searchOpen}
                aria-controls="site-search-input"
              >
                Search
              </button>
            </nav>
          </div>
        </header>

        <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-4 py-10" tabIndex={-1}>
          {children}
        </main>

        <footer className="border-t border-mizuno-200 py-6 text-center font-sans text-sm text-mizuno-700 dark:border-mizuno-700 dark:text-mizuno-300">
          <p>—</p>
        </footer>
      </div>

      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
