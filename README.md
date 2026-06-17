# rockfaker

Seeded fake data for KlangHaus development and tests. Three layers in one repo:

| Layer | Path | Use |
| --- | --- | --- |
| **Library** | `src/` | `import { createRockstarFaker } from 'rockfaker'` in code/tests |
| **Fixtures** | `fixtures/` | Committed JSON — import directly or serve via Mockoon |
| **HTTP mocks** | `mockoon/` | Mockoon environments for auth, Studio CDN, Etude bootstrap, etc. |

Zero runtime dependencies in the published library. `@mockoon/cli` is dev-only.

## Install

```bash
bun install
# or: npm install rockfaker
```

## Quick start (library)

```ts
import { createRockstarFaker } from "rockfaker";

const faker = createRockstarFaker({ locale: "da", seed: 42 });
faker.education.courses(5);
faker.person.fullName();
```

## Quick start (fixtures + Mockoon)

```bash
bun run fixtures:gen   # regenerate fixtures/ from seed 42
bun run mock:etude     # http://localhost:4010

# one command
bun run mock:up
```

See [mockoon/README.md](./mockoon/README.md) for endpoint list.

### Etude consumption example

```bash
# etude .env.development
MOCK_DEPS_BASE_URL=http://localhost:4010
```

```ts
const base = process.env.MOCK_DEPS_BASE_URL ?? "https://cdn.grundtone.io";
await fetch(`${base}/k/pk_live_explainers/tokens.json`);
await fetch(`${base}/v1/tenant/bootstrap`);
```

Import fixtures without HTTP:

```ts
import courses from "rockfaker/fixtures/etude/courses.seed-42.json";
```

## Modules

### `person`

| Method | Example |
| --- | --- |
| `firstName()` | `"Slash"` |
| `fullName()` | `"Freddie Mercury"` |
| `stageName()` | `"Big Kilmister"` |

### `band`

| Method | Example |
| --- | --- |
| `name()` | `"Nirvana"` |
| `genre()` | `"Grunge"` |
| `setlist(4)` | Song title array |

### `education` (Etude / explainers demo data)

| Method | Example |
| --- | --- |
| `courseTitle()` | `"Matematik A — differentialregning"` |
| `subject()` | `"Matematik"` |
| `courses(n)` | Array of `{ id, slug, title, moduleTitle, subject, instructor }` |

## Locales

`en` and `da` — switch with `createRockstarFaker({ locale: 'da' })` or `faker.setLocale('da')`.

## Seeded output

```ts
const a = createRockstarFaker({ seed: 42 });
const b = createRockstarFaker({ seed: 42 });
a.education.courses(3) === b.education.courses(3); // structurally equal
```

Regenerate committed fixtures after locale changes:

```bash
bun run fixtures:gen
bun run fixtures:check   # CI — fails if fixtures drift
```

## Playground

```bash
bun run playground
```

## Development

```bash
bun install
bun test
bun run build
bun run fixtures:gen
```

## Why not FakerJS?

| | FakerJS | rockfaker |
| --- | --- | --- |
| Bundle | ~8 MB | ~7 KB packed |
| Dependencies | Several | Zero (library) |
| Weighted data | No | Yes |
| Seeded | Verbose | One-liner |
| Fixtures + Mockoon | BYO | Built-in |

## License

MIT
