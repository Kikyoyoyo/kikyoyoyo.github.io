import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { SearchPanel } from "./SearchPanel";
import { UmamiScript } from "./Umami";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded px-2 py-1 font-sans text-sm text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
    isActive
      ? "bg-white/20 font-semibold text-white"
      : "hover:bg-white/10",
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
        <header className="sticky top-0 z-40 border-b border-mizuno-700 bg-mizuno-600 dark:border-mizuno-700 dark:bg-mizuno-800">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-3">
            <Link
              to="/"
              className="flex items-center gap-2 font-sans text-lg font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Logo variant="onBrand" />
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
                Fun
              </NavLink>
              <button
                type="button"
                className="rounded px-2 py-1 font-sans text-sm text-white/90 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
