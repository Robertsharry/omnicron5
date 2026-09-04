import { COMPLICATIONS, INCIDENTS } from "./data";
import type { Assessment, CaseFile, Choice, Metrics } from "./types";

export const INITIAL_METRICS: Metrics = { nerve: 50, weird: 10, paper: 0 };

export function pickOne<T>(items: readonly T[], random = Math.random): T {
  return items[Math.floor(random() * items.length)] ?? items[0];
}

export function createCase(random = Math.random): CaseFile {
  return {
    id: String(Math.floor(1000 + random() * 9000)),
    incident: pickOne(INCIDENTS, random),
    coordinates: {
      latitude: `${(random() * 90).toFixed(4)}° N`,
      longitude: `${(random() * 180).toFixed(4)}° W`,
    },
  };
}

export function randomComplication(random = Math.random): string {
  return pickOne(COMPLICATIONS, random);
}

export function applyChoice(metrics: Metrics, choice: Choice): Metrics {
  const [nerve, weird, paper] = choice.delta;
  return {
    nerve: clamp(metrics.nerve + nerve),
    weird: clamp(metrics.weird + weird),
    paper: clamp(metrics.paper + paper),
  };
}

export function assess(metrics: Metrics): Assessment {
  const { nerve, weird, paper } = metrics;
  if (paper > 60) return { grade: "B+", title: "Weaponized Bureaucrat", text: "You stared into the unknowable abyss and asked it to initial page three. Reality remains shaken by your command of procedure.", quote: "‘The universe is infinite. Your jurisdiction, however, is not.’ — Senior Clerk M. Voss" };
  if (weird > 70) return { grade: "A?", title: "Licensed Chaos Element", text: "You did not solve the incident so much as become its most interesting feature. The Bureau is alarmed, impressed, and updating its insurance.", quote: "‘Technically a success, which is the most dangerous kind.’ — Incident Review Board" };
  if (nerve > 85) return { grade: "A", title: "Unreasonably Brave Operative", text: "Against advice, precedent, and several laws of geometry, you held your nerve. The anomaly blinked first.", quote: "‘Confidence is just competence wearing sunglasses.’ — Field Manual, misprinted edition" };
  if (nerve > 68 && weird > 45) return { grade: "A−", title: "Chaotic Diplomat", text: "You negotiated with the impossible on its own terms, then somehow left with a handshake and a mildly cursed souvenir.", quote: "‘If it has teeth, offer tea. If it has more teeth, offer biscuits.’ — Bureau proverb" };
  if (paper > nerve) return { grade: "B", title: "Procedural Survivor", text: "Nobody is entirely sure what happened, but your forms are immaculate and the incident has been assigned to another department.", quote: "‘A paper trail is a map away from responsibility.’ — Unknown" };
  return { grade: "B?", title: "Inspired Improviser", text: "Your approach had no discernible pattern, which made it impossible for the incident to counter. We are pretending this was strategic.", quote: "‘The plan survives because there was never a plan.’ — Your final report" };
}

export function formatDossier(caseFile: CaseFile, metrics: Metrics): string {
  const result = assess(metrics);
  return [
    `BUREAU OF IMPROBABLE INCIDENTS — CASE #${caseFile.id}`,
    caseFile.incident.title,
    `Assessment: ${result.title} (${result.grade})`,
    `Nerve ${metrics.nerve} / Weirdness ${metrics.weird} / Paperwork ${metrics.paper}`,
    "",
    result.text,
  ].join("\n");
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}
