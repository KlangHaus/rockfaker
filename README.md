# rockfaker

Fake data generator with rockstar names. Zero dependencies, seeded PRNG, weighted randomness.

## Install

```bash
# npm
npm install rockfaker

# bun
bun add rockfaker
```

## Quick Start

```ts
import { rockstar } from "rockfaker";

rockstar.person.fullName();  // "Ozzy Nicks"
rockstar.person.stageName(); // "Big Kilmister"
rockstar.band.name();        // "Nine Inch Nails"
rockstar.band.genre();       // "Grunge"
rockstar.band.bio();         // "Black Sabbath is a Doom Metal band formed in 1987..."
rockstar.band.setlist(4);    // ["Neon Storm", "Iron Highway", "Broken Heart", ...]
```

## Locales

Built-in support for English and Danish.

```ts
import { rockstar, rockstarDa, createRockstarFaker } from "rockfaker";

// English (default)
rockstar.person.fullName(); // "Slash Hendrix"

// Danish
rockstarDa.person.fullName(); // "Lars Ulrich"
rockstarDa.band.genre();      // "Viking Metal"

// Switch on the fly
const faker = createRockstarFaker({ locale: "en" });
faker.setLocale("da");
faker.person.fullName(); // "Morten Ørsted"
```

## Seeded Output

Same seed = same sequence. Great for tests and snapshots.

```ts
import { createRockstarFaker } from "rockfaker";

const a = createRockstarFaker({ seed: 42 });
const b = createRockstarFaker({ seed: 42 });
a.person.fullName() === b.person.fullName(); // true
```

## Weighted Data

Names aren't uniformly distributed. Iconic names like "Slash" and "Hendrix" appear more often than obscure ones — just like in real life.

```ts
// In the locale data:
{ value: "Slash", weight: 5 }   // appears often
{ value: "Trent", weight: 2 }   // appears less
```

## Playground

Interactive REPL to try everything out:

```bash
bun run playground
```

```
  rockfaker [en] > name
  → Ozzy Nicks

  rockfaker [en] > card
  ┌─────────────────────────────────┐
  │ Billie "Thunder" Joplin         │
  │ Nine Inch Nails                 │
  │ Genre: Grunge                   │
  │ Album: Blood & Thunder          │
  └─────────────────────────────────┘

  rockfaker [en] > da
  → Skiftet til dansk

  rockfaker [da] > name
  → Lars Hedegaard
```

Commands: `name`, `first`, `last`, `stage`, `band`, `genre`, `album`, `bio`, `setlist`, `card`, `10`, `da`/`en`, `q`

## API

### `person`

| Method | Returns | Example |
|---|---|---|
| `firstName()` | string | `"Slash"` |
| `lastName()` | string | `"Mercury"` |
| `fullName()` | string | `"Freddie Mercury"` |
| `stageName()` | string | `"Big Kilmister"` |

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
| Bundle | ~8 MB | 6.8 KB packed |
| Dependencies | Several | Zero |
| PRNG | Mersenne Twister | Mulberry32 (faster) |
| Weighted data | No | Yes |
| Seeded | Verbose setup | One-liner |
| Tree-shakeable | Partial | Full |
| Playground | No | `bun run playground` |

## Development

```bash
bun install      # install deps
bun test         # run tests
bun run build    # compile to dist/
bun run playground  # interactive REPL
```

## License

MIT
