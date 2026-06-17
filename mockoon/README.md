# Mockoon environments (rockfaker)

HTTP stubs for KlangHaus services that are not running locally yet. Response bodies
are **committed JSON fixtures** under `../fixtures/` — regenerate with
`bun run fixtures:gen` after changing rockfaker locale data or generators.

## Quick start

```bash
# From rockfaker repo root
bun run fixtures:gen   # write fixtures/ from seed 42
bun run mock:etude     # start Mockoon on http://localhost:4010

# Regenerate + start
bun run mock:up
```

Stop:

```bash
bun run mock:stop
```

## Etude environment (`etude.json`)

Base URL: `http://localhost:4010`

| Method | Path | Fixture / body |
| --- | --- | --- |
| GET | `/k/pk_live_explainers/tokens.json` | `fixtures/etude/tokens.explainers.json` |
| GET | `/v1/tenant/bootstrap` | `fixtures/etude/tenant-bootstrap.json` |
| GET | `/v1/demo/courses` | `fixtures/etude/courses.seed-42.json` |
| GET | `/.well-known/jwks.json` | `fixtures/auth/jwks.stub.json` |
| POST | `/v1/notifications/send` | inline 202 |
| POST | `/v1/permissions/check` | inline `{ "allowed": true }` |

## Using from Etude (or other repos)

```bash
# .env.development in etude
MOCK_DEPS_BASE_URL=http://localhost:4010
```

```typescript
const base = process.env.MOCK_DEPS_BASE_URL ?? 'https://cdn.grundtone.io'
const tokens = await fetch(`${base}/k/pk_live_explainers/tokens.json`).then((r) => r.json())
```

Import fixtures directly in unit tests (no HTTP):

```typescript
import courses from 'rockfaker/fixtures/etude/courses.seed-42.json'
```

## Desktop editor

Open `mockoon/etude.json` in [Mockoon Desktop](https://mockoon.com/download/) to add
routes or delays. Prefer editing `scripts/generate-fixtures.ts` for data that should
stay seeded and reproducible.

## CI

```bash
bun run fixtures:check   # fails if committed fixtures drift from generator
```
