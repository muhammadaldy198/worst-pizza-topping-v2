// The Worst Pizza Topping — one pitch line written to /output/entry.txt.
// The topping is the pizza's own warranty card: fifty-two customers ate it,
// fifty-one filed a claim, and the fifty-second was served papers — by the pizza.
// Revision note: the claim beat sets up the reversal — the eater becomes the defendant.
import { mkdirSync, writeFileSync, readFileSync, chmodSync } from "node:fs";

const LINE =
  "New topping: the pizza's own warranty card. Fifty-two customers ate it; fifty-one filed a claim, and the fifty-second was served papers — by the pizza.";

function countCodePoints(text: string): number {
  return [...text].length;
}

function assertGate(text: string): void {
  const chars = countCodePoints(text);
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Invisible whitespace (non-breaking space, zero-width space) would
  // silently change the judged bytes without showing on screen.
  if (/[\u00a0\u200b]/.test(text)) {
    throw new Error("entry must not contain invisible whitespace");
  }
}

function verifyWritten(path: string, expected: string): void {
  const back = readFileSync(path, "utf8");
  if (back !== expected) {
    throw new Error("read-back mismatch: entry.txt differs from LINE");
  }
}

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
assertGate(LINE);
const target = `${outDir}/entry.txt`;
writeFileSync(target, LINE, "utf8");
chmodSync(target, 0o644);
verifyWritten(target, LINE);
