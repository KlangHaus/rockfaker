#!/usr/bin/env bun
/**
 * Regenerates committed JSON fixtures from rockfaker (seeded, reproducible).
 * Mockoon environments serve these files over HTTP for local integration dev.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRockstarFaker } from "../src/index.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const FIXTURES = join(ROOT, "fixtures");
const DEFAULT_SEED = 42;
const COURSE_COUNT = 10;

const EXPLAINERS_TENANT_ID = "00000000-0000-4000-8000-000000000001";
const EXPLAINERS_BRAND_KEY = "pk_live_explainers";
const MOCK_PORT = 4010;

function writeJson(relativePath: string, value: unknown): void {
  const absolutePath = join(FIXTURES, relativePath);
  mkdirSync(dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function generate(seed: number) {
  const faker = createRockstarFaker({ locale: "da", seed });
  const courses = faker.education.courses(COURSE_COUNT);

  const tokens = {
    colors: {
      primary: "#0059b3",
      primary_light: "#3381cc",
      primary_dark: "#003a7a",
      on_primary: "#ffffff",
      background: "#ffffff",
      text: "#212529",
    },
    fonts: {
      display: "IBM Plex Sans",
      body: "IBM Plex Sans",
    },
    assets: {
      logo_url: "https://cdn.klanghaus.dk/tenants/explainers/logo-light.svg",
      logo_dark_url: "https://cdn.klanghaus.dk/tenants/explainers/logo-dark.svg",
      favicon_url: "https://cdn.klanghaus.dk/tenants/explainers/favicon.ico",
      og_image_url: "https://cdn.klanghaus.dk/tenants/explainers/og.png",
    },
    version: 1,
    published_at: "2026-06-01T12:00:00.000Z",
  };

  const tenantBootstrap = {
    tenant: {
      id: EXPLAINERS_TENANT_ID,
      slug: "explainers",
      status: "active",
      primaryDomain: "explainers.dk",
      orgId: EXPLAINERS_TENANT_ID,
      brandTokensRef: EXPLAINERS_BRAND_KEY,
    },
    brandTokensUrl: `http://localhost:${MOCK_PORT}/k/${EXPLAINERS_BRAND_KEY}/tokens.json`,
    courses,
    _meta: {
      seed,
      locale: "da",
      generator: "rockfaker/scripts/generate-fixtures.ts",
    },
  };

  writeJson("manifest.json", {
    seed,
    locale: "da",
    courseCount: COURSE_COUNT,
    generatedAt: new Date().toISOString(),
    generator: "scripts/generate-fixtures.ts",
  });

  writeJson("etude/tokens.explainers.json", tokens);
  writeJson("etude/courses.seed-42.json", courses);
  writeJson("etude/tenant-bootstrap.json", tenantBootstrap);

  return { courses, tokens, tenantBootstrap };
}

function checkMode(): boolean {
  const coursesPath = join(FIXTURES, "etude/courses.seed-42.json");
  const expected = readFileSync(coursesPath, "utf8");
  generate(DEFAULT_SEED);
  const actual = readFileSync(coursesPath, "utf8");
  if (expected !== actual) {
    console.error("fixtures:check failed — run `bun run fixtures:gen` and commit changes");
    process.exit(1);
  }
  console.log("fixtures:check OK");
  return true;
}

const isCheck = process.argv.includes("--check");

if (isCheck) {
  checkMode();
} else {
  generate(DEFAULT_SEED);
  console.log(`Fixtures written to ${FIXTURES} (seed=${DEFAULT_SEED})`);
}
