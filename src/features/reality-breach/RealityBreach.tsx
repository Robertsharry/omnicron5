import { useEffect, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { useContainmentProtocol } from "./useContainmentProtocol";
import { useEvasiveButton } from "./useEvasiveButton";

interface RealityBreachProps {
  active: boolean;
  onBreach: () => void;
  onContain: () => void;
}

export function RealityBreach({ active, onBreach, onContain }: RealityBreachProps) {
  const { position, mode, attempts, taunt, evade } = useEvasiveButton(active);
  const protocol = useContainmentProtocol(active);
  const vulnerable = mode === "mercy";

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && active) event.preventDefault();
      if ((event.key === "Enter" || event.key === " ") && document.activeElement?.classList.contains("red-button") && !vulnerable) {
        event.preventDefault();
        evade({ x: position.x, y: position.y }, true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active, evade, position, vulnerable]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (vulnerable) return;
    event.preventDefault();
    evade({ x: event.clientX, y: event.clientY }, true);
  };

  const handleClick = () => {
    if (vulnerable) onBreach();
    else evade(position, true);
  };

  const debris = [...protocol.session.event.debris, ...protocol.session.event.debris];

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

      <div className={`breach${active ? " active" : ""} stage-${protocol.stage}`} aria-hidden={!active} role="dialog" aria-modal="true">
        <div className="breach-grid" aria-hidden="true" />
        <div className="reality-debris" aria-hidden="true">
          {debris.map((item, index) => (
            <span
              key={`${item}-${index}`}
              style={{
                left: `${7 + ((index * 37) % 87)}%`,
                top: `${8 + ((index * 23) % 84)}%`,
                animationDelay: `${-(index * 0.7)}s`,
                "--drift": `${index % 2 ? 1 : -1}`,
              } as CSSProperties}
            >{item}</span>
          ))}
        </div>

        {protocol.stage === "opening" && (
          <div className="breach-opening">
            <div className="breach-kicker">CONSEQUENCE CONFIRMED</div>
            <div className="breach-copy">REALITY<br />BREACHED</div>
            <p>You pressed the button. The button would like the record to show that it warned you.</p>
          </div>
        )}

        {protocol.stage === "unstable" && (
          <div className="containment-console">
            <header className="containment-header">
              <div>
                <span>BREACH EVENT // {protocol.session.event.code}</span>
                <h2>{protocol.session.event.headline}</h2>
                <p>{protocol.session.event.report}</p>
              </div>
              <div className="failure-count"><b>{String(protocol.failures).padStart(2, "0")}</b><span>TIMELINES<br />LOST</span></div>
            </header>

            <div className="stability-row">
              <span>REALITY INTEGRITY</span>
              <div className="stability-meter"><i style={{ width: `${protocol.stability}%` }} /></div>
              <b>{protocol.stability}%</b>
            </div>

            <div className="rift-field">
              <div className="rift-instruction">SEAL IN NUMERICAL ORDER</div>
              {protocol.session.rifts.map(rift => {
                const isSealed = rift.id <= protocol.sealed;
                return (
                  <button
                    key={rift.id}
                    className={`rift${isSealed ? " sealed" : ""}`}
                    style={{ left: `${rift.x}%`, top: `${rift.y}%` }}
                    onClick={() => protocol.sealRift(rift.id)}
                    disabled={isSealed}
                    aria-label={`Seal reality rift ${rift.id}`}
                  >
                    <i /><span>0{rift.id}</span><small>{isSealed ? "SEALED" : "UNSTABLE"}</small>
                  </button>
                );
              })}
              <div className="containment-reticle" aria-hidden="true" />
            </div>

            <div className="protocol-message" role="status">{protocol.message}</div>
          </div>
        )}

        {protocol.stage === "contained" && (
          <div className="breach-contained">
            <div className="contained-seal">✓</div>
            <div className="breach-kicker">TEMPORAL MAINTENANCE COMPLETE</div>
            <h2>REALITY<br /><em>MOSTLY</em> RESTORED</h2>
            <p>{protocol.session.event.resolution}</p>
            <div className="containment-receipt">
              <span>RIFTS SEALED <b>03</b></span>
              <span>TIMELINES LOST <b>{String(protocol.failures).padStart(2, "0")}</b></span>
              <span>LESSON LEARNED <b>NO</b></span>
            </div>
            <button onClick={onContain}>RETURN TO UNWISE DECISIONS ↗</button>
          </div>
        )}
      </div>
    </>
  );
}
