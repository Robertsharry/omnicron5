import { useCallback, useEffect, useRef, useState } from "react";
import { createBreachSession, isCorrectRift } from "./protocol";

export type BreachStage = "idle" | "opening" | "unstable" | "contained";

export function useContainmentProtocol(active: boolean) {
  const [stage, setStage] = useState<BreachStage>("idle");
  const [session, setSession] = useState(createBreachSession);
  const [stability, setStability] = useState(100);
  const [sealed, setSealed] = useState(0);
  const [failures, setFailures] = useState(0);
  const [message, setMessage] = useState("SEAL RIFTS 01 → 02 → 03");
  const sealedRef = useRef(0);

  useEffect(() => {
    if (!active) {
      setStage("idle");
      return;
    }
    setSession(createBreachSession());
    setStage("opening");
    setStability(100);
    setSealed(0);
    sealedRef.current = 0;
    setFailures(0);
    setMessage("SEAL RIFTS 01 → 02 → 03");
    const reveal = window.setTimeout(() => setStage("unstable"), 1150);
    return () => window.clearTimeout(reveal);
  }, [active]);

  useEffect(() => {
    if (stage !== "unstable") return;
    const decay = window.setInterval(() => {
      setStability(value => Math.max(0, value - 2));
    }, 260);
    return () => window.clearInterval(decay);
  }, [stage]);

  useEffect(() => {
    if (stage !== "unstable" || stability > 0) return;
    setFailures(count => count + 1);
    sealedRef.current = 0;
    setSealed(0);
    setSession(createBreachSession());
    setMessage("TIMELINE COLLAPSED. BACKUP TIMELINE DEPLOYED. IT IS NOT AS NICE.");
    setStability(100);
  }, [stability, stage]);

  useEffect(() => {
    document.body.classList.toggle("reality-unstable", active && stage !== "contained");
    return () => document.body.classList.remove("reality-unstable");
  }, [active, stage]);

  const sealRift = useCallback((riftId: number) => {
    if (stage !== "unstable") return;
    if (!isCorrectRift(sealedRef.current, riftId)) {
      setStability(value => Math.max(2, value - 18));
      setMessage(`WRONG RIFT, OPERATIVE. ${String(sealedRef.current + 1).padStart(2, "0")} COMES NEXT. NUMBERS REMAIN LINEAR.`);
      return;
    }

    const next = sealedRef.current + 1;
    sealedRef.current = next;
    setSealed(next);
    setStability(value => Math.min(100, value + 9));
    if (next === 3) {
      setStage("contained");
      setMessage("ALL RIFTS SEALED. REALITY IS EMBARRASSED BUT FUNCTIONAL.");
    } else {
      setMessage(`RIFT 0${riftId} SEALED. FIND 0${next + 1} BEFORE PHYSICS NOTICES.`);
    }
  }, [stage]);

  return { stage, session, stability, sealed, failures, message, sealRift };
}
