import { useEffect } from "react";

interface RealityBreachProps {
  active: boolean;
  onBreach: () => void;
  onContain: () => void;
}

export function RealityBreach({ active, onBreach, onContain }: RealityBreachProps) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && active) onContain();
      if (event.key.toLowerCase() === "b" && !event.metaKey && !event.ctrlKey && !active) onBreach();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active, onBreach, onContain]);

  return (
    <>
      <button className="red-button" onClick={onBreach} aria-label="Definitely do not press"><span>DO NOT<br />PRESS</span></button>
      <div className={`breach${active ? " active" : ""}`} aria-hidden={!active}>
        <div className="breach-copy">REALITY<br />BREACHED</div>
        <button onClick={onContain}>ATTEMPT CONTAINMENT</button>
      </div>
    </>
  );
}
