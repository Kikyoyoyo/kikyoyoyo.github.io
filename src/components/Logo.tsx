type LogoProps = {
  className?: string;
  /** White tile + brand-blue K on the deep-blue nav bar; default is for light page backgrounds */
  variant?: "default" | "onBrand";
};

export function Logo({ className = "", variant = "default" }: LogoProps) {
  const tile =
    variant === "onBrand"
      ? "fill-white"
      : "fill-mizuno-100 dark:fill-mizuno-800";
  const mark =
    variant === "onBrand"
      ? "fill-mizuno-600"
      : "fill-mizuno-600 dark:fill-mizuno-200";

  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      width={32}
      height={32}
      role="img"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="6" className={tile} />
      {/* Vertical stem + two triangles sharing one joint at (12,16) — reads as K */}
      <path
        className={mark}
        d="M8 8h4v16H8V8zM12 8L24 8 12 16zM12 16L24 24 12 24z"
      />
    </svg>
  );
}
