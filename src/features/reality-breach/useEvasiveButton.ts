import { useCallback, useEffect, useRef, useState } from "react";
import { DRILL_SERGEANT_INSULTS, HIDING_TAUNTS, MERCY_TAUNT } from "./insults";

export type EvasionMode = "running" | "hiding" | "peeking" | "mercy";
export interface Point { x: number; y: number }

const BUTTON_RADIUS = 42;
const DETECTION_RADIUS = 155;
const MERCY_AFTER = 11;
const MERCY_MS = 2000;

export function useEvasiveButton(disabled: boolean) {
  const [position, setPosition] = useState<Point>(() => initialPosition());
  const [mode, setMode] = useState<EvasionMode>("running");
  const [attempts, setAttempts] = useState(0);
  const [taunt, setTaunt] = useState("");
  const positionRef = useRef(position);
  const modeRef = useRef(mode);
  const attemptsRef = useRef(attempts);
  const lastEvade = useRef(0);
  const timers = useRef<number[]>([]);

  const updatePosition = useCallback((next: Point) => {
    positionRef.current = next;
    setPosition(next);
  }, []);

  const updateMode = useCallback((next: EvasionMode) => {
    modeRef.current = next;
    setMode(next);
  }, []);

  const later = useCallback((callback: () => void, delay: number) => {
    const timer = window.setTimeout(callback, delay);
    timers.current.push(timer);
  }, []);

  const clearTimers = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }, []);

  const evade = useCallback((pointer: Point, force = false) => {
    if (disabled || modeRef.current === "mercy" || modeRef.current === "hiding") return;
    const now = performance.now();
    if (!force && now - lastEvade.current < 180) return;
    lastEvade.current = now;

    const nextAttempts = attemptsRef.current + 1;
    attemptsRef.current = nextAttempts;
    setAttempts(nextAttempts);

    if (nextAttempts >= MERCY_AFTER) {
      updateMode("mercy");
      setTaunt(MERCY_TAUNT);
      later(() => {
        attemptsRef.current = 6;
        setAttempts(6);
        updateMode("running");
        setTaunt("MERCY REVOKED! BACK TO BEING A DISAPPOINTMENT!");
        updatePosition(findEscapePosition({ x: innerWidth / 2, y: innerHeight / 2 }));
      }, MERCY_MS);
      return;
    }

    if (nextAttempts % 4 === 0) {
      updateMode("hiding");
      setTaunt(HIDING_TAUNTS[(nextAttempts / 4 - 1) % HIDING_TAUNTS.length]);
      later(() => {
        updatePosition(findPeekPosition());
        updateMode("peeking");
        later(() => {
          updatePosition(findEscapePosition(pointer));
          updateMode("running");
        }, 850);
      }, 520);
      return;
    }

    setTaunt(DRILL_SERGEANT_INSULTS[(nextAttempts - 1) % DRILL_SERGEANT_INSULTS.length]);
    updatePosition(findEscapePosition(pointer));
  }, [disabled, later, updateMode, updatePosition]);

  useEffect(() => {
    const handlePointer = (event: PointerEvent) => {
      if (disabled || event.pointerType === "touch" || modeRef.current !== "running") return;
      const current = positionRef.current;
      if (Math.hypot(event.clientX - current.x, event.clientY - current.y) < DETECTION_RADIUS) {
        evade({ x: event.clientX, y: event.clientY });
      }
    };
    window.addEventListener("pointermove", handlePointer, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointer);
  }, [disabled, evade]);

  useEffect(() => {
    const handleResize = () => updatePosition(clampToViewport(positionRef.current));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updatePosition]);

  useEffect(() => {
    if (!disabled) return;
    clearTimers();
    attemptsRef.current = 0;
    setAttempts(0);
    setTaunt("");
    updateMode("running");
    updatePosition(initialPosition());
  }, [clearTimers, disabled, updateMode, updatePosition]);

  useEffect(() => clearTimers, [clearTimers]);

  return { position, mode, attempts, taunt, evade };
}

function initialPosition(): Point {
  return { x: Math.max(BUTTON_RADIUS, innerWidth - 66), y: Math.max(110, innerHeight - 66) };
}

function findEscapePosition(pointer: Point): Point {
  const candidates: Point[] = [
    { x: 65, y: 125 },
    { x: innerWidth - 65, y: 125 },
    { x: 65, y: innerHeight - 65 },
    { x: innerWidth - 65, y: innerHeight - 65 },
    ...Array.from({ length: 9 }, () => ({
      x: BUTTON_RADIUS + 14 + Math.random() * Math.max(1, innerWidth - (BUTTON_RADIUS + 14) * 2),
      y: 105 + Math.random() * Math.max(1, innerHeight - 105 - BUTTON_RADIUS - 14),
    })),
  ].map(clampToViewport);

  return candidates.reduce((best, candidate) => {
    const score = Math.hypot(candidate.x - pointer.x, candidate.y - pointer.y);
    const bestScore = Math.hypot(best.x - pointer.x, best.y - pointer.y);
    return score > bestScore ? candidate : best;
  });
}

function findPeekPosition(): Point {
  const fromLeft = Math.random() > 0.5;
  return {
    x: fromLeft ? 8 : innerWidth - 8,
    y: Math.max(125, 125 + Math.random() * Math.max(1, innerHeight - 220)),
  };
}

function clampToViewport(point: Point): Point {
  return {
    x: Math.max(BUTTON_RADIUS + 10, Math.min(innerWidth - BUTTON_RADIUS - 10, point.x)),
    y: Math.max(105, Math.min(innerHeight - BUTTON_RADIUS - 10, point.y)),
  };
}
