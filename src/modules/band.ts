import type { Engine } from "../core/engine.js";
import type { RockstarLocale } from "../core/types.js";

export class BandModule {
  constructor(
    private engine: Engine,
    private locale: RockstarLocale,
  ) {}

  name(): string {
    return this.engine.pickFrom(this.locale.band.name);
  }

  genre(): string {
    return this.engine.pickFrom(this.locale.band.genre);
  }

  album(): string {
    return this.engine.pickFrom(this.locale.band.album);
  }

  /** Generate a full band bio blurb */
  bio(): string {
    const bandName = this.name();
    const genre = this.genre();
    const albumName = this.album();
    const year = this.engine.int(1965, 2025);
    return `${bandName} is a ${genre} band formed in ${year}. Their latest album "${albumName}" went platinum.`;
  }

  /** Generate a random setlist of N songs */
  setlist(count = 5): string[] {
    const adjectives = ["Electric", "Burning", "Midnight", "Neon", "Broken", "Crimson", "Shadow", "Golden", "Iron", "Velvet"];
    const nouns = ["Highway", "Heart", "Thunder", "Dream", "Fire", "Storm", "Angel", "Demon", "River", "Mountain"];
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      result.push(`${this.engine.pick(adjectives)} ${this.engine.pick(nouns)}`);
    }
    return result;
  }
}
