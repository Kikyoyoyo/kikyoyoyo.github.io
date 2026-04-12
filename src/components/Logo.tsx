type LogoProps = {
  className?: string;
  /** 
   * default: Ethereum-style diamond (glyph) with brand colors
   * onBrand: White/Light version for dark backgrounds
   */
  variant?: "default" | "onBrand";
};

export function Logo({ className = "", variant = "default" }: LogoProps) {
  const tileClass = variant === "onBrand" ? "fill-eth-purple-dark" : "fill-eth-purple";

  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      width={32}
      height={32}
      role="img"
      aria-label="K Logo"
    >
      {/* Violet/Purple background square with rounded corners */}
      <rect width="32" height="32" rx="8" className={tileClass} />
      
      {/* White 'K' letter */}
      <path
        d="M9 7h3v18H9V7zm3 9l8-9h4l-9 9 10 9h-4l-9-9z"
        fill="white"
      />
    </svg>
  );
}
