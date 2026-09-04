import { PHASES } from "./data";
import type { Choice } from "./types";

interface DecisionPanelProps {
  phaseIndex: number;
  dispatch: string;
  locked: boolean;
  choices: readonly Choice[];
  onChoose: (choice: Choice, index: number) => void;
}

export function DecisionPanel({ phaseIndex, dispatch, locked, choices, onChoose }: DecisionPanelProps) {
  return (
    <div className="decision-panel">
      <div className="phase-line">
        <span>{PHASES[phaseIndex]}</span>
        <span>0{phaseIndex + 1} / 05</span>
      </div>
      <div className="progress"><i style={{ width: `${(phaseIndex + 1) * 20}%` }} /></div>
      <p className="dispatch">{dispatch}</p>
      <div className={`choices${locked ? " locked" : ""}`}>
        {choices.map((choice, index) => (
          <button className="choice" data-key={`0${index + 1}`} disabled={locked} key={choice.text} onClick={() => onChoose(choice, index)}>
            {choice.text}
          </button>
        ))}
      </div>
      <p className="keyboard-hint">PRESS 1–3 TO DECIDE. Hesitation will be documented.</p>
    </div>
  );
}
