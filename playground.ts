import { createRockstarFaker } from "./src/index.js";
import * as readline from "node:readline";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let locale: "en" | "da" = "en";
let seed: number | undefined;
let faker = createRockstarFaker({ locale, seed });

function rebuild() {
  faker = createRockstarFaker({ locale, seed });
}

const commands: Record<string, () => void> = {
  name:      () => console.log(`  → ${faker.person.fullName()}`),
  first:     () => console.log(`  → ${faker.person.firstName()}`),
  last:      () => console.log(`  → ${faker.person.lastName()}`),
  stage:     () => console.log(`  → ${faker.person.stageName()}`),
  band:      () => console.log(`  → ${faker.band.name()}`),
  genre:     () => console.log(`  → ${faker.band.genre()}`),
  album:     () => console.log(`  → ${faker.band.album()}`),
  bio:       () => console.log(`  → ${faker.band.bio()}`),
  setlist:   () => faker.band.setlist(6).forEach((s, i) => console.log(`  ${i + 1}. ${s}`)),
  da:        () => { locale = "da"; rebuild(); console.log("  → Skiftet til dansk"); },
  en:        () => { locale = "en"; rebuild(); console.log("  → Switched to English"); },
  "10":      () => { for (let i = 0; i < 10; i++) console.log(`  ${faker.person.fullName()}`); },
  card:      () => {
    console.log(`  ┌─────────────────────────────────┐`);
    console.log(`  │ ${faker.person.stageName().padEnd(32)}│`);
    console.log(`  │ ${faker.band.name().padEnd(32)}│`);
    console.log(`  │ Genre: ${faker.band.genre().padEnd(25)}│`);
    console.log(`  │ Album: ${faker.band.album().padEnd(25)}│`);
    console.log(`  └─────────────────────────────────┘`);
  },
};

function handle(input: string) {
  const cmd = commands[input.trim().toLowerCase()];
  if (cmd) {
    cmd();
    console.log();
  } else if (input.trim()) {
    console.log(`  ? unknown: "${input.trim()}"\n`);
  }
}

console.log(`
  ╔══════════════════════════════════╗
  ║         rockfaker                ║
  ╠══════════════════════════════════╣
  ║  name   – full rockstar name    ║
  ║  first  – first name            ║
  ║  last   – last name             ║
  ║  stage  – stage name            ║
  ║  band   – band name             ║
  ║  genre  – music genre           ║
  ║  album  – album title           ║
  ║  bio    – band biography        ║
  ║  setlist – generate setlist     ║
  ║  card   – rockstar card         ║
  ║  10     – 10 random names       ║
  ║  da/en  – switch locale         ║
  ║  q      – quit                  ║
  ╚══════════════════════════════════╝
`);

function showPrompt() {
  process.stdout.write(`  rockfaker [${locale}] > `);
}

showPrompt();
rl.on("line", (line) => {
  const input = line.trim().toLowerCase();
  if (input === "q" || input === "quit" || input === "exit") {
    rl.close();
    return;
  }
  handle(input);
  showPrompt();
});

rl.on("close", () => process.exit(0));
