import { describe, it, expect } from "bun:test";
import { rockstar, rockstarDa, createRockstarFaker } from "./index.js";

describe("rockfaker", () => {
  describe("person", () => {
    it("generates a first name", () => {
      expect(rockstar.person.firstName()).toBeString();
    });

    it("generates a last name", () => {
      expect(rockstar.person.lastName()).toBeString();
    });

    it("generates a full name with at least two parts", () => {
      const name = rockstar.person.fullName();
      expect(name.split(" ").length).toBeGreaterThanOrEqual(2);
    });

    it("generates a stage name", () => {
      expect(rockstar.person.stageName().length).toBeGreaterThan(0);
    });
  });

  describe("band", () => {
    it("generates a band name", () => {
      expect(rockstar.band.name()).toBeString();
    });

    it("generates a genre", () => {
      expect(rockstar.band.genre()).toBeString();
    });

    it("generates an album", () => {
      expect(rockstar.band.album()).toBeString();
    });

    it("generates a bio string", () => {
      expect(rockstar.band.bio()).toContain("band formed in");
    });

    it("generates a setlist of requested length", () => {
      expect(rockstar.band.setlist(7)).toHaveLength(7);
    });
  });

  describe("seeded output", () => {
    it("produces identical output for the same seed", () => {
      const a = createRockstarFaker({ seed: 123 });
      const b = createRockstarFaker({ seed: 123 });
      expect(a.person.fullName()).toBe(b.person.fullName());
      expect(a.band.name()).toBe(b.band.name());
      expect(a.band.genre()).toBe(b.band.genre());
    });

    it("produces different output for different seeds", () => {
      const a = createRockstarFaker({ seed: 1 });
      const b = createRockstarFaker({ seed: 999 });
      const namesA = Array.from({ length: 10 }, () => a.person.fullName());
      const namesB = Array.from({ length: 10 }, () => b.person.fullName());
      expect(namesA.join()).not.toBe(namesB.join());
    });
  });

  describe("locale", () => {
    it("danish locale generates names", () => {
      expect(rockstarDa.person.fullName().length).toBeGreaterThan(0);
    });

    it("setLocale switches on the fly", () => {
      const f = createRockstarFaker({ seed: 42, locale: "en" });
      expect(f.locale).toBe("en");
      f.setLocale("da");
      expect(f.locale).toBe("da");
    });
  });

  describe("engine", () => {
    it("int stays within range", () => {
      const f = createRockstarFaker({ seed: 1 });
      for (let i = 0; i < 100; i++) {
        const n = f.engine.int(5, 10);
        expect(n).toBeGreaterThanOrEqual(5);
        expect(n).toBeLessThanOrEqual(10);
      }
    });

    it("pattern fills # with digits and ? with letters", () => {
      const f = createRockstarFaker({ seed: 1 });
      expect(f.engine.pattern("##-???")).toMatch(/^\d{2}-[a-z]{3}$/);
    });

    it("shuffle preserves all elements", () => {
      const f = createRockstarFaker({ seed: 1 });
      const arr = [1, 2, 3, 4, 5];
      const shuffled = f.engine.shuffle(arr);
      expect(shuffled).toHaveLength(arr.length);
      expect(shuffled.sort()).toEqual(arr.sort());
    });
  });
});
