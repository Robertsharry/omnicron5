import { useEffect } from "react";
import { CHOICES } from "./data";
import { DecisionPanel } from "./DecisionPanel";
import { Dossier } from "./Dossier";
import { MetricsPanel } from "./MetricsPanel";
import type { Choice, GameState } from "./types";

interface CaseScreenProps {
  state: GameState;
  onAbandon: () => void;
  onChoose: (choice: Choice, index: number) => void;
}

export function CaseScreen({ state, onAbandon, onChoose }: CaseScreenProps) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (!["1", "2", "3"].includes(event.key) || state.locked) return;
      const index = Number(event.key) - 1;
      const choice = CHOICES[state.phaseIndex]?.[index];
      if (choice) onChoose(choice, index);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onChoose, state.locked, state.phaseIndex]);

  if (!state.caseFile) return null;
  return (
    <section className="case" aria-live="polite">
      <div className="case-header">
        <div>
          <div className="eyebrow">ACTIVE CASE <span>#{state.caseFile.id}</span></div>
          <h2>{state.caseFile.incident.title}</h2>
        </div>
        <button className="text-btn" onClick={onAbandon}>ABANDON CASE ↺</button>
      </div>
      <div className="case-grid">
        <Dossier caseFile={state.caseFile} />
        <DecisionPanel phaseIndex={state.phaseIndex} dispatch={state.dispatch} locked={state.locked} onChoose={onChoose} />
        <MetricsPanel metrics={state.metrics} logs={state.logs} />
      </div>
    </section>
  );
}
