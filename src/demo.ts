import { rockstar, rockstarDa, createRockstarFaker } from "./index.js";

console.log("=== ENGLISH ROCKSTARS ===");
for (let i = 0; i < 5; i++) {
  console.log(`  ${rockstar.person.fullName()} — ${rockstar.band.genre()}`);
}

console.log("\n=== DANSKE ROCKSTJERNER ===");
for (let i = 0; i < 5; i++) {
  console.log(`  ${rockstarDa.person.fullName()} — ${rockstarDa.band.genre()}`);
}

console.log("\n=== STAGE NAMES ===");
for (let i = 0; i < 5; i++) {
  console.log(`  ${rockstar.person.stageName()}`);
}

console.log("\n=== BAND BIO ===");
console.log(`  ${rockstar.band.bio()}`);

console.log("\n=== SETLIST ===");
rockstar.band.setlist(6).forEach((song, i) => {
  console.log(`  ${i + 1}. ${song}`);
});

console.log("\n=== SEEDED (same seed = same output) ===");
const a = createRockstarFaker({ seed: 42 });
const b = createRockstarFaker({ seed: 42 });
console.log(`  A: ${a.person.fullName()}`);
console.log(`  B: ${b.person.fullName()}`);
console.log(`  Match: ${a.engine.seed === b.engine.seed}`);
