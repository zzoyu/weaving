import { describe, expect, it } from "vitest";
import { generateProviderId } from "./generateProviderId";

describe("generateProviderId", () => {
  it("generates 19 digit numeric strings without leading zero", () => {
    const id = generateProviderId();
    expect(id).toHaveLength(19);
    expect(/^[0-9]+$/.test(id)).toBe(true);
    expect(id[0]).not.toBe("0");
  });

  it("generates unique-ish ids across multiple calls", () => {
    const ids = new Set<string>();
    for (let i = 0; i < 1000; i++) ids.add(generateProviderId());
    // extremely low collision probability; require >990 unique
    expect(ids.size).toBeGreaterThan(990);
  });
});
