/** YAML parses unquoted `2025-03-25` as a `Date` — React cannot render Date objects. */
export function normalizePostDate(raw: unknown): string | null {
  if (raw instanceof Date && !Number.isNaN(raw.getTime())) {
    const y = raw.getUTCFullYear();
    const m = String(raw.getUTCMonth() + 1).padStart(2, "0");
    const d = String(raw.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  if (typeof raw === "string" && raw.trim()) return raw.trim();
  return null;
}
