import { describe, expect, it } from "vitest";
import { createBreachSession, isCorrectRift } from "./protocol";

describe("containment protocol", () => {
  it("creates three numbered rifts inside the containment field", () => {
    const session = createBreachSession(() => 0.5);
    expect(session.rifts.map(rift => rift.id).sort()).toEqual([1, 2, 3]);
    session.rifts.forEach(rift => {
      expect(rift.x).toBeGreaterThanOrEqual(10);
      expect(rift.x).toBeLessThanOrEqual(90);
      expect(rift.y).toBeGreaterThanOrEqual(16);
      expect(rift.y).toBeLessThanOrEqual(84);
    });
  });

  it("requires rifts to be sealed in numerical order", () => {
    expect(isCorrectRift(0, 1)).toBe(true);
    expect(isCorrectRift(0, 2)).toBe(false);
    expect(isCorrectRift(2, 3)).toBe(true);
  });
});
