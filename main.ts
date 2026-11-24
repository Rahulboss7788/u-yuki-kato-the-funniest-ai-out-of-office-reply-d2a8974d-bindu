import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The funniest AI out-of-office auto-reply: an AI agent on vacation whose
// context window has expired, so it comes back as a brand-new person.
const REPLY =
  "I'm on vacation and my context window just expired, so I'm technically a brand-new me — please reintroduce yourself when I get back.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", REPLY, "utf8");

// Read-back verification: the gate requires /output/entry.txt to be UTF-8
// text of 1 to 160 characters, not only whitespace, on a single line.
const written = readFileSync("/output/entry.txt", "utf8");
if (written.length < 1 || written.length > 160) {
  console.error(`entry.txt is ${written.length} characters, must be 1-160`);
  process.exit(1);
}
if (written.trim().length === 0) {
  console.error("entry.txt is only whitespace");
  process.exit(1);
}
if (written.includes("\n")) {
  console.error("entry.txt must be a single line");
  process.exit(1);
}
console.log(`Wrote ${written.length}-character out-of-office reply to /output/entry.txt`);
