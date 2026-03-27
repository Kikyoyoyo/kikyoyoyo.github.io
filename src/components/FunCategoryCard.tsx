import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type FunCategoryCardProps = {
  to: string;
  title: string;
  description: string;
  icon: ReactNode;
};

export function FunCategoryCard({
  to,
  title,
  description,
  icon,
}: FunCategoryCardProps) {
  return (
    <Link
      to={to}
      className="group flex gap-4 rounded-xl border border-mizuno-200 bg-white/90 p-5 shadow-sm transition-[border-color,box-shadow,transform] duration-200 hover:border-mizuno-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mizuno-600 dark:border-mizuno-700 dark:bg-mizuno-800/40 dark:hover:border-mizuno-600 motion-safe:hover:-translate-y-0.5"
    >
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-mizuno-100 text-mizuno-600 dark:bg-mizuno-800/80 dark:text-mizuno-400"
        aria-hidden
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-sans text-lg font-semibold text-mizuno-900 group-hover:text-mizuno-800 dark:text-mizuno-50 dark:group-hover:text-mizuno-100">
          {title}
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-mizuno-700 dark:text-mizuno-300">
          {description}
        </span>
      </span>
    </Link>
  );
}
