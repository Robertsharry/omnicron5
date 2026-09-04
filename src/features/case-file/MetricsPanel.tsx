import type { Metrics } from "./types";

export function MetricsPanel({ metrics, logs }: { metrics: Metrics; logs: string[] }) {
  return (
    <aside className="metrics">
      <Metric label="NERVE" value={metrics.nerve} />
      <Metric label="WEIRDNESS" value={metrics.weird} kind="weird" />
      <Metric label="PAPERWORK" value={metrics.paper} kind="paper" />
      <div className="field-log">
        <div className="log-title">FIELD LOG</div>
        <ol>{logs.map((log, index) => <li key={`${log}-${index}`}>{log}</li>)}</ol>
      </div>
    </aside>
  );
}

function Metric({ label, value, kind = "" }: { label: string; value: number; kind?: string }) {
  return (
    <div className="metric">
      <div><span>{label}</span><b>{value}</b></div>
      <div className={`meter ${kind}`}><i style={{ width: `${value}%` }} /></div>
    </div>
  );
}
