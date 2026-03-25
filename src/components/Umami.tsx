import { useEffect } from "react";

/**
 * Loads Umami when VITE_UMAMI_WEBSITE_ID and VITE_UMAMI_SCRIPT_URL are set at build time.
 */
export function UmamiScript() {
  useEffect(() => {
    const id = import.meta.env.VITE_UMAMI_WEBSITE_ID as string | undefined;
    const src = import.meta.env.VITE_UMAMI_SCRIPT_URL as string | undefined;
    if (!id || !src) return;
    const existing = document.querySelector(`script[data-website-id="${id}"]`);
    if (existing) return;
    const el = document.createElement("script");
    el.defer = true;
    el.src = src;
    el.dataset.websiteId = id;
    document.head.appendChild(el);
  }, []);
  return null;
}
