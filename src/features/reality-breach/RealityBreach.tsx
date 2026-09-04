import type { PointerEvent as ReactPointerEvent } from "react";
import { useEffect } from "react";
import { useEvasiveButton } from "./useEvasiveButton";

interface RealityBreachProps {
  active: boolean;
  onBreach: () => void;
  onContain: () => void;
}

export function RealityBreach({ active, onBreach, onContain }: RealityBreachProps) {
  const { position, mode, attempts, taunt, evade } = useEvasiveButton(active);
  const vulnerable = mode === "mercy";

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && active) onContain();
      if ((event.key === "Enter" || event.key === " ") && document.activeElement?.classList.contains("red-button") && !vulnerable) {
        event.preventDefault();
        evade({ x: position.x, y: position.y }, true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active, evade, onContain, position, vulnerable]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (vulnerable) return;
    event.preventDefault();
    evade({ x: event.clientX, y: event.clientY }, true);
  };

  const handleClick = () => {
    if (vulnerable) onBreach();
    else evade(position, true);
  };

  return (
    <>
      {taunt && !active && (
        <div className="drill-sergeant" role="status" aria-live="polite">
          <span>BUTTON DEFENSE UNIT // ATTEMPT {String(attempts).padStart(2, "0")}</span>
          <strong>{taunt}</strong>
        </div>
      )}
      <button
        className={`red-button ${mode}`}
        style={{ left: position.x, top: position.y }}
        onPointerDown={handlePointerDown}
        onClick={handleClick}
        aria-label={vulnerable ? "Press now: temporary mercy window" : "Definitely do not press; evasive target"}
      >
        <span>{vulnerable ? <>PRESS<br />NOW</> : <>DO NOT<br />PRESS</>}</span>
      </button>
      <div className={`breach${active ? " active" : ""}`} aria-hidden={!active}>
        <div className="breach-copy">REALITY<br />BREACHED</div>
        <button onClick={onContain}>ATTEMPT CONTAINMENT</button>
      </div>
    </>
  );
}
