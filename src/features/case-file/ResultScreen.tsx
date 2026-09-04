import { assess } from "./engine";
import type { GameState } from "./types";

interface ResultScreenProps {
  state: GameState;
  onAgain: () => void;
  onCopy: () => void;
}

export function ResultScreen({ state, onAgain, onCopy }: ResultScreenProps) {
  if (!state.caseFile) return null;
  const result = assess(state.metrics);
  return (
    <section className="result" aria-live="polite">
      <div className="result-card">
        <div className="result-code">CASE #{state.caseFile.id} // MOSTLY CLOSED</div>
        <div className="result-seal">{result.grade}</div>
        <div className="eyebrow">OFFICIAL ASSESSMENT</div>
        <h2>{result.title}</h2>
        <p>{result.text}</p>
        <div className="result-stats">
          <div><span>FINAL NERVE</span><b>{state.metrics.nerve}</b></div>
          <div><span>WEIRDNESS TOLERATED</span><b>{state.metrics.weird}</b></div>
          <div><span>FORMS GENERATED</span><b>{state.metrics.paper}</b></div>
        </div>
        <div className="result-quote">{result.quote}</div>
        <div className="result-actions">
          <button className="primary-btn compact" onClick={onAgain}><span>NEW INCIDENT</span><span className="arrow">↻</span></button>
          <button className="text-btn" onClick={onCopy}>COPY DOSSIER</button>
        </div>
      </div>
    </section>
  );
}
