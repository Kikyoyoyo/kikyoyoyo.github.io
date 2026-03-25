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
      <rect width="32" height="32" rx="6" className="fill-mizuno-100 dark:fill-mizuno-800" />
      <path
        className="fill-mizuno-600 dark:fill-mizuno-200"
        d="M8 24V8h3.2l6.4 9.6L24 8h3.2v16H24V13.6l-5.6 8.4h-1.6L11.2 13.6V24H8z"
      />
    </svg>
  );
}
