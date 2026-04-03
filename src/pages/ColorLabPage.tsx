import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

const SAVE_URL = "/__dev/save-blueish-theme";

function rgbStringToHex(rgb: string): string {
  const m = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return rgb.trim();
  const [r, g, b] = m.slice(1, 4).map(Number);
  return (
    "#" +
    [r, g, b]
      .map((n) => n.toString(16).padStart(2, "0"))
      .join("")
      .toLowerCase()
  );
}

function normalizeHexInput(input: string): string | null {
  const s = input.trim().replace(/^#/, "");
  if (!s) return null;
  if (s.length === 3 && /^[0-9a-fA-F]{3}$/.test(s)) {
    return "#" + s.split("").map((c) => c + c).join("").toLowerCase();
  }
  if (/^[0-9a-fA-F]{6}$/.test(s)) return "#" + s.toLowerCase();
  return null;
}

function readColorsFromDom(): Record<string, string> {
  const root = document.documentElement;
  const cs = getComputedStyle(root);
  const next: Record<string, string> = {};
  for (const shade of SHADES) {
    const raw = cs.getPropertyValue(`--color-blueish-${shade}`).trim();
    if (raw.startsWith("#")) {
      next[String(shade)] = raw.toLowerCase();
      continue;
    }
    const probe = document.createElement("div");
    probe.style.cssText = `position:absolute;left:-9999px;background:var(--color-blueish-${shade})`;
    root.appendChild(probe);
    const resolved = getComputedStyle(probe).backgroundColor;
    root.removeChild(probe);
    if (resolved && resolved !== "rgba(0, 0, 0, 0)") {
      next[String(shade)] = rgbStringToHex(resolved);
    } else if (raw) {
      next[String(shade)] = raw;
    }
  }
  return next;
}

function clearInlineTheme(): void {
  const root = document.documentElement.style;
  for (const shade of SHADES) {
    root.removeProperty(`--color-blueish-${shade}`);
  }
}

function buildThemeSnippet(colors: Record<string, string>): string {
  const lines = SHADES.map(
    (s) => `  --color-blueish-${s}: ${colors[String(s)] ?? "#000000"};`,
  );
  return [`@theme {`, `  /* blueish palette */`, ...lines, `}`].join("\n");
}

export function ColorLabPage() {
  useDocumentTitle("Color lab — Zheng Chen");
  const [colors, setColors] = useState<Record<string, string>>({});
  /** Raw text field while typing incomplete hex */
  const [textDrafts, setTextDrafts] = useState<Record<string, string>>({});
  const userEdited = useRef(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "ok" | "err">("idle");
  const [saveMessage, setSaveMessage] = useState("");

  const isDev = import.meta.env.DEV;

  useLayoutEffect(() => {
    setColors(readColorsFromDom());
  }, []);

  useEffect(() => {
    if (!userEdited.current || Object.keys(colors).length === 0) return;
    const root = document.documentElement;
    for (const shade of SHADES) {
      const v = colors[String(shade)];
      if (v) root.style.setProperty(`--color-blueish-${shade}`, v);
    }
  }, [colors]);

  useEffect(() => {
    return () => {
      clearInlineTheme();
    };
  }, []);

  function patchColor(shade: string, hex: string | null) {
    if (!hex) return;
    userEdited.current = true;
    setColors((prev) => ({ ...prev, [shade]: hex }));
  }

  async function saveToCss() {
    setSaveState("saving");
    setSaveMessage("");
    try {
      const res = await fetch(SAVE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(colors),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? res.statusText);
      }
      clearInlineTheme();
      userEdited.current = false;
      setSaveState("ok");
      setSaveMessage("Written to src/index.css. Hot reload should refresh styles.");
      window.setTimeout(() => {
        setTextDrafts({});
        setColors(readColorsFromDom());
      }, 200);
    } catch (e) {
      setSaveState("err");
      setSaveMessage(e instanceof Error ? e.message : String(e));
    }
  }

  function copyThemeSnippet() {
    void navigator.clipboard.writeText(buildThemeSnippet(colors));
  }

  return (
    <article>
      <nav aria-label="Breadcrumb" className="mb-4 font-sans text-sm text-blueish-600 dark:text-blueish-400">
        <Link
          to="/fun"
          className="underline underline-offset-2 hover:text-blueish-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueish-600 dark:hover:text-blueish-200"
        >
          Fun
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-blueish-800 dark:text-blueish-200">Color lab</span>
      </nav>

      <h1 className="mb-2 text-3xl font-semibold text-blueish-900 dark:text-blueish-50">
        Color lab
      </h1>
      <p className="mb-4 font-sans text-sm text-blueish-700 dark:text-blueish-300">
        Edit <code className="rounded bg-blueish-100 px-1 py-0.5 font-mono text-xs dark:bg-blueish-800">blueish</code> steps
        below. Preview updates immediately; saving writes into{" "}
        <code className="rounded bg-blueish-100 px-1 py-0.5 font-mono text-xs dark:bg-blueish-800">src/index.css</code>
        {isDev ? " (dev server only)." : " (use dev server locally to save to disk)."}
      </p>

      <div className="mb-8 flex flex-wrap items-center gap-3">
        {isDev ? (
          <button
            type="button"
            className="rounded border border-blueish-400 bg-blueish-600 px-4 py-2 font-sans text-sm font-medium text-white shadow-sm hover:bg-blueish-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueish-600 disabled:opacity-50"
            disabled={saveState === "saving" || Object.keys(colors).length === 0}
            onClick={() => void saveToCss()}
          >
            {saveState === "saving" ? "Saving…" : "Save to src/index.css"}
          </button>
        ) : (
          <p className="font-sans text-sm text-blueish-700 dark:text-blueish-300">
            To persist changes, run <code className="font-mono text-xs">npm run dev</code> and use Save here, or copy the
            snippet below into <code className="font-mono text-xs">src/index.css</code>.
          </p>
        )}
        <button
          type="button"
          className="rounded border border-blueish-300 bg-white px-3 py-2 font-sans text-sm text-blueish-800 hover:bg-blueish-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueish-600 dark:border-blueish-600 dark:bg-blueish-900 dark:text-blueish-100 dark:hover:bg-blueish-800"
          onClick={copyThemeSnippet}
        >
          Copy @theme snippet
        </button>
      </div>
      {saveMessage && (
        <p
          className={`mb-6 font-sans text-sm ${saveState === "err" ? "text-red-700 dark:text-red-300" : "text-blueish-700 dark:text-blueish-300"}`}
          role={saveState === "err" ? "alert" : "status"}
        >
          {saveMessage}
        </p>
      )}

      <section aria-labelledby="scale-heading" className="mb-10">
        <h2 id="scale-heading" className="mb-3 text-lg font-semibold text-blueish-900 dark:text-blueish-50">
          Full scale
        </h2>
        <div className="flex h-14 w-full max-w-3xl overflow-hidden rounded-lg border border-blueish-200 shadow-sm dark:border-blueish-600">
          {SHADES.map((shade) => (
            <div
              key={shade}
              className="min-w-0 flex-1"
              style={{
                backgroundColor: colors[String(shade)] ?? `var(--color-blueish-${shade})`,
              }}
              title={`blueish-${shade}`}
            />
          ))}
        </div>
        <p className="mt-2 font-mono text-xs text-blueish-600 dark:text-blueish-400">50 → 950</p>
      </section>

      <section aria-labelledby="swatches-heading" className="mb-10">
        <h2 id="swatches-heading" className="mb-3 text-lg font-semibold text-blueish-900 dark:text-blueish-50">
          Swatches
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {SHADES.map((shade) => {
            const key = String(shade);
            const stored = colors[key] ?? "";
            const display = textDrafts[key] ?? stored;
            const valid = normalizeHexInput(display);
            const pickerValue = valid ?? "#000000";
            return (
              <li
                key={shade}
                className="flex overflow-hidden rounded-lg border border-blueish-200 dark:border-blueish-600"
              >
                <div
                  className="w-20 shrink-0 sm:w-24"
                  style={{
                    backgroundColor: valid ?? `var(--color-blueish-${shade})`,
                  }}
                  aria-hidden
                />
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 bg-white px-3 py-2 font-sans dark:bg-blueish-900">
                  <span className="text-sm font-medium text-blueish-900 dark:text-blueish-50">
                    blueish-{shade}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="color"
                      aria-label={`Pick color for blueish-${shade}`}
                      className="h-9 w-14 cursor-pointer rounded border border-blueish-300 bg-white dark:border-blueish-600"
                      value={pickerValue}
                      onChange={(e) => {
                        const n = normalizeHexInput(e.target.value);
                        if (n) {
                          patchColor(key, n);
                          setTextDrafts((d) => {
                            const next = { ...d };
                            delete next[key];
                            return next;
                          });
                        }
                      }}
                    />
                    <input
                      type="text"
                      spellCheck={false}
                      aria-label={`Hex for blueish-${shade}`}
                      className="min-w-0 flex-1 rounded border border-blueish-200 bg-white px-2 py-1 font-mono text-sm text-blueish-900 dark:border-blueish-600 dark:bg-blueish-950 dark:text-blueish-50"
                      value={display}
                      placeholder="#rrggbb"
                      onChange={(e) => {
                        const raw = e.target.value;
                        setTextDrafts((d) => ({ ...d, [key]: raw }));
                        const n = normalizeHexInput(raw);
                        if (n) patchColor(key, n);
                      }}
                      onBlur={() => {
                        setTextDrafts((d) => {
                          const next = { ...d };
                          delete next[key];
                          return next;
                        });
                      }}
                    />
                  </div>
                  {!valid && display.trim().length > 0 && (
                    <span className="text-xs text-amber-700 dark:text-amber-300">Invalid hex</span>
                  )}
                  {valid && (
                    <button
                      type="button"
                      className="w-fit text-left font-sans text-xs text-blueish-700 underline underline-offset-2 hover:text-blueish-900 dark:text-blueish-300 dark:hover:text-blueish-100"
                      onClick={() => void navigator.clipboard.writeText(valid)}
                    >
                      Copy hex
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="ui-heading" className="mb-6">
        <h2 id="ui-heading" className="mb-3 text-lg font-semibold text-blueish-900 dark:text-blueish-50">
          Layout preview
        </h2>
        <p className="mb-3 font-sans text-sm text-blueish-700 dark:text-blueish-300">
          Same classes as the site header (light vs dark strip).
        </p>
        <div className="space-y-4">
          <div>
            <p className="mb-1 font-sans text-xs font-medium text-blueish-600 dark:text-blueish-400">Light header</p>
            <div className="overflow-hidden rounded-lg border border-blueish-200 dark:border-blueish-600">
              <div className="border-b border-blueish-700 bg-blueish-600 px-4 py-3 font-sans text-sm text-white/90">
                <span className="font-semibold">Zheng Chen</span>
                <span className="ml-3 opacity-90">Home · Blog · …</span>
              </div>
              <div className="bg-white px-4 py-3 text-sm text-blueish-800">
                Main content uses <code className="font-mono text-xs">bg-white</code> and body text{" "}
                <code className="font-mono text-xs">text-blueish-900</code>.
              </div>
            </div>
          </div>
          <div>
            <p className="mb-1 font-sans text-xs font-medium text-blueish-600 dark:text-blueish-400">Dark header</p>
            <div className="overflow-hidden rounded-lg border border-blueish-200 dark:border-blueish-600">
              <div className="border-b border-blueish-700 bg-blueish-800 px-4 py-3 font-sans text-sm text-white/90">
                <span className="font-semibold">Zheng Chen</span>
                <span className="ml-3 opacity-90">Home · Blog · …</span>
              </div>
              <div className="bg-blueish-900 px-4 py-3 text-sm text-blueish-100">
                Page background in dark mode.
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
