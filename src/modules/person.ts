import type { Engine } from "../core/engine.js";
import type { RockstarLocale } from "../core/types.js";

export class PersonModule {
  constructor(
    private engine: Engine,
    private locale: RockstarLocale,
  ) {}

  firstName(): string {
    return this.engine.pickFrom(this.locale.person.firstName);
  }

  lastName(): string {
    return this.engine.pickFrom(this.locale.person.lastName);
  }

  /** Full rockstar name – occasionally adds a prefix or suffix */
  fullName(): string {
    const first = this.firstName();
    const last = this.lastName();
    const roll = this.engine.next();

    if (roll < 0.1 && this.locale.person.prefix) {
      return `${this.engine.pickFrom(this.locale.person.prefix)} ${first} ${last}`;
    }
    if (roll > 0.9 && this.locale.person.suffix) {
      return `${first} ${last} ${this.engine.pickFrom(this.locale.person.suffix)}`;
    }
    return `${first} ${last}`;
  }

  /** Generate a rockstar stage name like "Slash", "The Edge", etc. */
  stageName(): string {
    const patterns = [
      () => this.firstName(),
      () => `${this.firstName()} "${this.engine.pick(["The Hammer", "Shredder", "Thunder", "Lightning", "Viper", "Wolf", "Phoenix", "Raven", "Storm", "Blade"])}" ${this.lastName()}`,
      () => `${this.engine.pick(["The", "El", "Big", "Lil'", "Old"])} ${this.lastName()}`,
    ];
    return this.engine.pick(patterns)();
  }
}
