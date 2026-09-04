import { useClock } from "../../hooks/useClock";

export function Hero({ onBegin }: { onBegin: () => void }) {
  const clock = useClock();
  return (
    <section className="hero">
      <div className="eyebrow"><span>UNAUTHORIZED ACCESS DETECTED</span><span>{clock}</span></div>
      <h1>YOU LOOK<br /><em>BORED.</em></h1>
      <p className="hero-copy">Convenient. Reality has developed a small administrative problem, and everyone competent is at lunch.</p>
      <button className="primary-btn" onClick={onBegin}>
        <span>ACCEPT A CASE</span><span className="arrow">↗</span>
      </button>
      <div className="fineprint">By continuing, you waive your right to a predictable afternoon.</div>
      <div className="orb-wrap" aria-hidden="true">
        <div className="orbit orbit-one"><i /></div>
        <div className="orbit orbit-two"><i /></div>
        <div className="orb"><span>?</span></div>
      </div>
    </section>
  );
}
