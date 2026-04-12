import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function FunPage() {
  useDocumentTitle("Fun — Kikyoyoyo");

  return (
    <div className="relative">
      <section className="py-12">
        <h1 className="mb-6 text-4xl font-bold text-slate-900 dark:text-white">
          Fun <span className="eth-gradient-text">& Curiosities</span>
        </h1>
        <p className="mb-10 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
          Small side projects, games, and digital experiments that explore the boundaries of the "Infinite Garden".
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <Link to="/fun/games" className="eth-card group">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-eth-purple/10 text-eth-purple transition-colors group-hover:bg-eth-purple group-hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Games</h3>
            <p className="text-slate-600 dark:text-slate-400">Board games in the browser. Two-player local sessions for a quick break.</p>
          </Link>

          <Link to="/fun/games/sand" className="eth-card group">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 transition-colors group-hover:bg-violet-500 group-hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 3h12M6 9h12M8 9v3a4 4 0 004 4 4 4 0 004-4V9M9 17h6" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Sand Sim</h3>
            <p className="text-slate-600 dark:text-slate-400">A tiny physics playground: paint sand and watch granular motion emerge.</p>
          </Link>

          <div className="eth-card group opacity-80">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Badminton</h3>
            <p className="text-slate-600 dark:text-slate-400">Notes and links about my favorite sport. Coming soon to the garden.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
