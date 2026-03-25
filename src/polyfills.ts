/**
 * gray-matter uses Node's Buffer in the browser bundle; define it before any
 * module that parses Markdown runs.
 */
import { Buffer } from "buffer";

const g = globalThis as typeof globalThis & { Buffer?: typeof Buffer };
if (g.Buffer === undefined) {
  g.Buffer = Buffer;
}
