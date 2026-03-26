type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      width={32}
      height={32}
      role="img"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="2" className="fill-white dark:fill-mizuno-800" />
      <path
        className="fill-mizuno-600 dark:fill-mizuno-200"
        d="M7 7h4.5v8.8L21.5 7H26l-9 10.2L26 25h-4.5l-6.8-7.8V25H7V7z"
      />
    </svg>
  );
}
