import { BREACH_EVENTS, type BreachEvent } from "./breachData";

export interface Rift {
  id: 1 | 2 | 3;
  x: number;
  y: number;
}

export interface BreachSession {
  event: BreachEvent;
  rifts: readonly Rift[];
}

const ZONES = [
  { x: 18, y: 28 },
  { x: 76, y: 24 },
  { x: 48, y: 72 },
] as const;

export function createBreachSession(random = Math.random): BreachSession {
  const event = BREACH_EVENTS[Math.floor(random() * BREACH_EVENTS.length)] ?? BREACH_EVENTS[0];
  const rifts = ZONES
    .map((zone, index) => ({
      id: (index + 1) as Rift["id"],
      x: clamp(zone.x + (random() - 0.5) * 16, 10, 90),
      y: clamp(zone.y + (random() - 0.5) * 14, 16, 84),
    }))
    .sort(() => random() - 0.5);
  return { event, rifts };
}

export function isCorrectRift(sealedCount: number, riftId: number): boolean {
  return riftId === sealedCount + 1;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
