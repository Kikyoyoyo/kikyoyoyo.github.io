import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function HomePage() {
  useDocumentTitle("Kikyoyoyo");

  return (
    <div className="relative">
      {/* Hero Section with Ethereum-style background */}
      <section className="relative py-20 overflow-hidden">
        <div className="eth-hero-bg eth-grid-pattern opacity-50"></div>
        <div className="absolute top-0 right-0 -z-10 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-eth-purple/20 blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-eth-gradient-end/10 blur-[120px]"></div>

        <div className="relative z-10">
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl">
            <span className="block text-slate-900 dark:text-white">Kikyoyoyo</span>
            <span className="block text-xl font-medium text-slate-600 dark:text-slate-400 sm:text-2xl">
              Blog, notes, and small demos.
            </span>
          </h1>
          
          <div className="max-w-2xl">
            <p className="mb-6 text-xl leading-relaxed text-slate-600 dark:text-slate-400">
              Hon. BSc. Computer Science Specialist & Math Major, University of Toronto. 
              Currently doing <span className="font-semibold text-eth-purple">quant development</span> and <span className="font-semibold text-eth-purple">research</span>.
            </p>
            <p className="mb-10 text-lg text-slate-500 dark:text-slate-500">
              Math & CS enjoyer, badminton enthusiast, art lover, and philosophy reader.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/blog" className="eth-button">
                Read My Blog
              </Link>
              <a href="https://github.com/Kikyoyoyo/" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800">
                GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Grid */}
      <section className="py-20">
        <h2 className="mb-12 text-3xl font-bold text-slate-900 dark:text-white">Explore the Garden</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <Link to="/blog" className="eth-card group">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-eth-purple/10 text-eth-purple transition-colors group-hover:bg-eth-purple group-hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v4a2 2 0 002 2h4" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Blog</h3>
            <p className="text-slate-600 dark:text-slate-400">Notes on ideas, phenomena, and lessons learned in the digital wilderness.</p>
          </Link>

          <Link to="/fun" className="eth-card group">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 text-pink-500 transition-colors group-hover:bg-pink-500 group-hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Fun & Projects</h3>
            <p className="text-slate-600 dark:text-slate-400">Games, tools, and digital curiosities to brighten your day.</p>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">Get in Touch</h2>
            <p className="text-slate-600 dark:text-slate-400">Always open to interesting conversations and collaborations.</p>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="mailto:chenzheng0430@gmail.com" className="text-slate-600 hover:text-eth-purple dark:text-slate-400 dark:hover:text-eth-purple-light transition-colors">
              Email
            </a>
            <a href="https://github.com/Kikyoyoyo/" className="text-slate-600 hover:text-eth-purple dark:text-slate-400 dark:hover:text-eth-purple-light transition-colors">
              GitHub
            </a>
            <a href="https://huggingface.co/kikyoyoyo/" className="text-slate-600 hover:text-eth-purple dark:text-slate-400 dark:hover:text-eth-purple-light transition-colors">
              HuggingFace
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
