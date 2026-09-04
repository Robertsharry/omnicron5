import { describe, expect, it } from "vitest";
import { INCIDENTS } from "./data";
import { applyChoice, assess, createBeat, createCase, formatDossier, pickOne } from "./engine";

describe("case engine", () => {
  it("creates a deterministic case with a deterministic random source", () => {
    const caseFile = createCase(() => 0);
    expect(caseFile.id).toBe("1000");
    expect(caseFile.incident).toEqual(INCIDENTS[0]);
    expect(caseFile.coordinates).toEqual({ latitude: "0.0000° N", longitude: "0.0000° W" });
  });

  it("selects from a collection", () => {
    expect(pickOne(["first", "second"], () => 0.99)).toBe("second");
  });

  it("applies choice deltas and clamps metrics", () => {
    expect(applyChoice({ nerve: 95, weird: 2, paper: 99 }, INCIDENTS[0].openingChoices[0]))
      .toEqual({ nerve: 100, weird: 7, paper: 100 });
  });

  it("creates prompt-specific choices for each story beat", () => {
    const beat = createBeat(INCIDENTS[4], 2, () => 0);
    expect(beat.dispatch).toContain("pigeon negotiating committee");
    expect(beat.choices[0].text).toContain("goose");
  });

  it("provides three contextual options for every follow-up phase", () => {
    for (let phase = 1; phase <= 4; phase += 1) {
      const beat = createBeat(INCIDENTS[6], phase, () => 0.99);
      expect(beat.choices).toHaveLength(3);
      expect(beat.dispatch).toContain("ocean door");
    }
  });

  it("prioritizes the bureaucracy outcome", () => {
    expect(assess({ nerve: 100, weird: 100, paper: 61 }).title).toBe("Weaponized Bureaucrat");
  });

  it("formats a shareable dossier", () => {
    const dossier = formatDossier(createCase(() => 0), { nerve: 75, weird: 50, paper: 12 });
    expect(dossier).toContain("CASE #1000");
    expect(dossier).toContain("Chaotic Diplomat");
  });
});
