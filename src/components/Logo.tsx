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
      {/* Sharp tile + bold geometric K (Mizuno-like: flat shapes, no soft marketing curves) */}
      <rect width="32" height="32" rx="2" className="fill-white dark:fill-mizuno-800" />
      <path
        className="fill-mizuno-600 dark:fill-mizuno-200"
        d="M7 24V8h4.2l5.8 8.7L22.8 8H27v16h-4V14.2l-6.2 9.3h-2.1L8.2 14.2V24H7z"
      />
    </svg>
  );
}
