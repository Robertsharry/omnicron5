import { applyChoice, INITIAL_METRICS } from "./engine";
import type { CaseFile, Choice, GameState } from "./types";

export const initialGameState: GameState = {
  status: "idle",
  caseFile: null,
  phaseIndex: 0,
  metrics: INITIAL_METRICS,
  logs: [],
  choices: [],
  dispatch: "",
  locked: false,
};

export type GameAction =
  | { type: "START"; caseFile: CaseFile }
  | { type: "CHOOSE"; choice: Choice }
  | { type: "ADVANCE"; dispatch: string }
  | { type: "COMPLETE" }
  | { type: "ABANDON" };

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START":
      return { ...initialGameState, status: "active", caseFile: action.caseFile, dispatch: action.caseFile.incident.dispatch };
    case "CHOOSE":
      if (state.status !== "active" || state.locked) return state;
      return {
        ...state,
        metrics: applyChoice(state.metrics, action.choice),
        logs: [action.choice.log, ...state.logs],
        choices: [...state.choices, action.choice.text],
        locked: true,
      };
    case "ADVANCE":
      return { ...state, phaseIndex: state.phaseIndex + 1, dispatch: action.dispatch, locked: false };
    case "COMPLETE":
      return { ...state, status: "complete", locked: false };
    case "ABANDON":
      return initialGameState;
  }
}
