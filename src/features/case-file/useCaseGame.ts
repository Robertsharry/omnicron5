import { useCallback, useEffect, useReducer, useRef } from "react";
import { PHASES } from "./data";
import { createCase, randomComplication } from "./engine";
import { gameReducer, initialGameState } from "./gameReducer";
import type { Choice } from "./types";

const TRANSITION_MS = 420;

export function useCaseGame() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const start = useCallback(() => {
    window.clearTimeout(timer.current);
    dispatch({ type: "START", caseFile: createCase() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const abandon = useCallback(() => {
    window.clearTimeout(timer.current);
    dispatch({ type: "ABANDON" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const choose = useCallback((choice: Choice) => {
    if (state.status !== "active" || state.locked) return false;
    dispatch({ type: "CHOOSE", choice });
    timer.current = window.setTimeout(() => {
      if (state.phaseIndex >= PHASES.length - 1) dispatch({ type: "COMPLETE" });
      else dispatch({ type: "ADVANCE", dispatch: randomComplication() });
    }, TRANSITION_MS);
    return true;
  }, [state.locked, state.phaseIndex, state.status]);

  return { state, start, abandon, choose };
}
