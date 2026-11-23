import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one-line patch note for a bug in real life / human biology.
const LINE =
  "v2.7.0: fixed a bug where the brain replayed an embarrassing moment from 2014 at 3:00 a.m. instead of sleeping.";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || join(process.cwd(), "output");
mkdirSync(outDir, { recursive: true });
const out = join(outDir, "entry.txt");
writeFileSync(out, LINE);

// Self-check: read back and verify byte-identical, no trailing newline,
// within the 1-160 character gate, and in patch-note register (version prefix).
const back = readFileSync(out, "utf8");
if (back !== LINE) throw new Error("read-back mismatch");
if (back.length < 1 || back.length > 160)
  throw new Error("length out of gate range");
if (back.endsWith("\n")) throw new Error("trailing newline");
if (!/^v\d+\.\d+\.\d+: /.test(back)) throw new Error("missing version prefix");
console.log(`wrote entry.txt (${LINE.length} chars)`);
