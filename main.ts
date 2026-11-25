// Funniest One-Line Out-of-Office Reply — make.fun entry
// Writes a single-line out-of-office auto-reply to /output/entry.txt.
// Gate (competition.yaml): UTF-8 text, 1-160 characters, not only whitespace.
import { readFileSync, writeFileSync } from "node:fs";

const MIN_CHARS = 1;
const MAX_CHARS = 160;

const ENTRY =
  "I'm out of office until Monday. My inbox is being handled by Dave, who has never once replied to an email — so frankly, nothing has changed.";

function validateEntry(text: string): void {
  const chars = [...text];
  if (chars.length < MIN_CHARS || chars.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validateEntry(ENTRY);
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Byte-level read-back verification: what was written must match exactly.
const written = readFileSync("/output/entry.txt");
const expected = Buffer.from(ENTRY, "utf8");
if (!written.equals(expected)) {
  throw new Error("read-back mismatch: /output/entry.txt differs from entry");
}
console.log(
  `Wrote ${[...ENTRY].length} characters to /output/entry.txt (verified byte-for-byte)`,
);
