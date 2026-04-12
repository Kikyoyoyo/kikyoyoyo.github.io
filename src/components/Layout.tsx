import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { SearchPanel } from "./SearchPanel";
import { UmamiScript } from "./Umami";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-full px-4 py-2 font-sans text-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eth-purple",
    isActive
      ? "bg-eth-purple/10 font-semibold text-eth-purple dark:bg-eth-purple/20 dark:text-eth-purple-light"
      : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
  ].join(" ");

export function Layout({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0b0d] selection:bg-eth-purple/30">
      <UmamiScript />
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:inline-block focus:h-auto focus:w-auto focus:overflow-visible focus:rounded-full focus:bg-eth-purple focus:px-6 focus:py-3 focus:font-sans focus:text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-eth-purple"
      >
        Skip to main content
      </a>
      
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-[#0a0b0d]/80">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
            <Link
              to="/"
              className="flex items-center gap-3 font-sans text-xl font-bold text-slate-900 dark:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eth-purple"
            >
              <Logo variant="default" className="h-8 w-8" />
              <span className="hidden sm:inline">Kikyoyoyo</span>
            </Link>
            
            <nav aria-label="Primary" className="flex flex-wrap items-center gap-1">
              <NavLink to="/" className={navLinkClass} end>
                Home
              </NavLink>
              <NavLink to="/blog" className={navLinkClass}>
                Blog
              </NavLink>
              <NavLink to="/fun" className={navLinkClass}>
                Fun
              </NavLink>
              <button
                type="button"
                className="ml-2 rounded-full p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eth-purple"
                onClick={() => setSearchOpen(true)}
                aria-expanded={searchOpen}
                aria-controls="site-search-input"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </nav>
          </div>
        </header>

        <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6" tabIndex={-1}>
          {children}
        </main>

        <footer className="border-t border-slate-100 py-10 dark:border-slate-800">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Logo variant="onBrand" />
                <span className="font-sans text-sm font-semibold">Kikyoyoyo</span>
              </div>
              <p className="font-sans text-sm text-slate-500 dark:text-slate-400">
                © {new Date().getFullYear()} Kikyoyoyo.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
