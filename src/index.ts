import { Engine } from "./core/engine.js";
import type { RockstarLocale } from "./core/types.js";
import { PersonModule } from "./modules/person.js";
import { BandModule } from "./modules/band.js";
import { EducationModule } from "./modules/education.js";
import en from "./locales/en/index.js";
import da from "./locales/da/index.js";

export type { RockstarLocale, Weighted, DataSource } from "./core/types.js";
export type { CourseFixture } from "./modules/education.js";

const locales = { en, da } as const;
type LocaleCode = keyof typeof locales;

export class RockstarFaker {
  person: PersonModule;
  band: BandModule;
  education: EducationModule;
  readonly engine: Engine;

  private _locale: RockstarLocale;

  constructor(options: { locale?: LocaleCode; seed?: number } = {}) {
    this._locale = locales[options.locale ?? "en"];
    this.engine = new Engine(options.seed);
    this.person = new PersonModule(this.engine, this._locale);
    this.band = new BandModule(this.engine, this._locale);
    this.education = new EducationModule(this.engine, this._locale);
  }

  /** Switch locale on the fly */
  setLocale(code: LocaleCode): this {
    this._locale = locales[code];
    this.person = new PersonModule(this.engine, this._locale);
    this.band = new BandModule(this.engine, this._locale);
    this.education = new EducationModule(this.engine, this._locale);
    return this;
  }

  /** Reset seed for reproducible sequences */
  seed(seed: number): this {
    this.engine.reseed(seed);
    return this;
  }

  get locale(): string {
    return this._locale.code;
  }
}

/** Pre-built instances for quick usage */
export const rockstar = new RockstarFaker({ locale: "en" });
export const rockstarDa = new RockstarFaker({ locale: "da" });

/** Factory for custom config */
export function createRockstarFaker(options?: { locale?: LocaleCode; seed?: number }) {
  return new RockstarFaker(options);
}
