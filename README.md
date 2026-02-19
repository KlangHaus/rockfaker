# rockfaker

Fake data generator with rockstar names. Zero dependencies, seeded PRNG, weighted randomness.

## Install

```bash
npm install rockfaker
```

## Quick Start

```ts
import { rockstar } from "rockfaker";

rockstar.person.fullName();  // "Iggy Hendrix"
rockstar.person.stageName(); // "Big Van Halen"
rockstar.band.name();        // "Led Zeppelin"
rockstar.band.genre();       // "Thrash Metal"
rockstar.band.bio();         // "Black Sabbath is a Doom Metal band formed in 1987..."
rockstar.band.setlist(4);    // ["Neon Fire", "Crimson River", ...]
```

## Danish Locale

```ts
import { rockstarDa } from "rockfaker";

rockstarDa.person.fullName(); // "Lars Ulrich"
rockstarDa.band.genre();      // "Viking Metal"
```

## Seeded Output

Same seed always produces the same sequence — great for tests and snapshots.

```ts
import { createRockstarFaker } from "rockfaker";

const faker = createRockstarFaker({ seed: 42, locale: "da" });
faker.person.fullName(); // Always the same result with seed 42
```

## Switch Locale On The Fly

```ts
import { createRockstarFaker } from "rockfaker";

const faker = createRockstarFaker({ locale: "en" });
faker.person.fullName(); // English rockstar

faker.setLocale("da");
faker.person.fullName(); // Danish rockstar
```

## API

### `person`

| Method | Returns | Example |
|---|---|---|
| `firstName()` | string | `"Slash"` |
| `lastName()` | string | `"Mercury"` |
| `fullName()` | string | `"Freddie Mercury"` |
| `stageName()` | string | `"The Notorious Cobain"` |

### `band`

| Method | Returns | Example |
|---|---|---|
| `name()` | string | `"Nirvana"` |
| `genre()` | string | `"Grunge"` |
| `album()` | string | `"Blood & Thunder"` |
| `bio()` | string | Full band bio sentence |
| `setlist(n)` | string[] | Random song titles |

### `engine`

Low-level access to the PRNG:

| Method | Description |
|---|---|
| `next()` | Random float `[0, 1)` |
| `int(min, max)` | Random integer in range |
| `pick(array)` | Random item from array |
| `pickMany(source, n)` | N unique items |
| `shuffle(array)` | Fisher-Yates shuffle |
| `pattern(template)` | `#` = digit, `?` = letter |

## Why Not FakerJS?

| | FakerJS | rockfaker |
|---|---|---|
| Bundle | ~8 MB | < 20 KB |
| Dependencies | Several | Zero |
| PRNG | Mersenne Twister | Mulberry32 (faster) |
| Weighted data | No | Yes |
| Seeded | Verbose setup | One-liner |
| Tree-shakeable | Partial | Full |

## License

MIT
