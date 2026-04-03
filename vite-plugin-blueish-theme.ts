import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function normalizeHex(input: string): string | null {
  const s = input.trim().replace(/^#/, "");
  if (!s) return null;
  if (s.length === 3 && /^[0-9a-fA-F]{3}$/.test(s)) {
    return "#" + s.split("").map((c) => c + c).join("").toLowerCase();
  }
  if (/^[0-9a-fA-F]{6}$/.test(s)) return "#" + s.toLowerCase();
  return null;
}

/** Dev-only: POST /__dev/save-blueish-theme with JSON { "50": "#aabbcc", ... } → writes src/index.css */
export function blueishThemePlugin(): Plugin {
  return {
    name: "blueish-theme-writer",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method !== "POST" || req.url !== "/__dev/save-blueish-theme") {
          next();
          return;
        }
        let body = "";
        req.on("data", (c: Buffer | string) => {
          body += typeof c === "string" ? c : c.toString("utf8");
        });
        req.on("end", () => {
          try {
            const parsed = JSON.parse(body) as Record<string, string>;
            const cssPath = path.join(__dirname, "src/index.css");
            let css = fs.readFileSync(cssPath, "utf8");
            for (const [shade, hexRaw] of Object.entries(parsed)) {
              if (!/^\d{2,3}$/.test(shade)) continue;
              const hex = normalizeHex(hexRaw);
              if (!hex) continue;
              const re = new RegExp(`(--color-blueish-${shade}:)\\s*[^;]+;`, "g");
              css = css.replace(re, `$1 ${hex};`);
            }
            fs.writeFileSync(cssPath, css, "utf8");
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: true }));
          } catch (e) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: false, error: String(e) }));
          }
        });
      });
    },
  };
}
