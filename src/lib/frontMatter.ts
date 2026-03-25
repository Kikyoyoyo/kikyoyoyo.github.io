import { parse as parseYaml } from "yaml";

/**
 * Split YAML front matter (--- ... ---) from Markdown body.
 * Line-oriented so `---` inside fenced code in the body is not confused.
 */
export function splitFrontMatter(raw: string): { data: Record<string, unknown>; body: string } {
  const text = raw.replace(/^\uFEFF/, "");
  const lines = text.split(/\r?\n/);
  if (!lines.length || lines[0].trim() !== "---") {
    return { data: {}, body: text.trim() };
  }

  const fmLines: string[] = [];
  let i = 1;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "---") break;
    fmLines.push(line);
    i += 1;
  }

  if (i >= lines.length) {
    return { data: {}, body: text.trim() };
  }

  const yamlBlock = fmLines.join("\n");
  let data: Record<string, unknown> = {};
  if (yamlBlock.trim()) {
    try {
      const parsed = parseYaml(yamlBlock);
      data =
        parsed && typeof parsed === "object" && !Array.isArray(parsed)
          ? (parsed as Record<string, unknown>)
          : {};
    } catch {
      data = {};
    }
  }

  const body = lines.slice(i + 1).join("\n").replace(/^\n/, "");
  return { data, body: body.trim() };
}
