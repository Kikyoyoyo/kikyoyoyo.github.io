import type { SVGProps } from "react";

/** Shuttlecock + racket motif for Fun → Sports (line style aligned with Lucide). */
export function BadmintonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {/* Racket head + handle */}
      <ellipse cx="15.5" cy="8" rx="4.2" ry="5.2" transform="rotate(35 15.5 8)" />
      <line x1="11.2" y1="12.2" x2="7" y2="18.5" />
      <line x1="12.4" y1="11.2" x2="8.2" y2="17.5" />
      {/* Shuttlecock cone + skirt */}
      <path d="M5.5 17.5 L8.5 14.5 L6.8 13.2 L4.2 15.8 Z" />
      <path d="M4.2 15.8 L3.2 16.8 M3.6 15.4 L2.6 16.4 M4.8 16.2 L3.8 17.2" />
    </svg>
  );
}
