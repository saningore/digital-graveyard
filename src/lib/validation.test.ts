import { describe, expect, it } from "vitest";
import { graveSchema, makeSlug } from "./validation";

const valid = { name: "Archive", github_url: "https://github.com/codyza/archive", description: "A sufficiently descriptive account of an abandoned developer project.", tech_stack: ["Next.js"], revivable: true };

describe("graveSchema", () => {
  it("accepts a complete valid grave", () => expect(graveSchema.safeParse(valid).success).toBe(true));
  it("requires a GitHub repository", () => expect(graveSchema.safeParse({ ...valid, github_url: "https://gitlab.com/a/b" }).success).toBe(false));
  it("limits technologies to eight", () => expect(graveSchema.safeParse({ ...valid, tech_stack: Array(9).fill("React") }).success).toBe(false));
});

describe("makeSlug", () => {
  it("makes readable URL-safe slugs", () => expect(makeSlug("My Amazing App!")).toMatch(/^my-amazing-app-[a-z0-9]{5}$/));
});
