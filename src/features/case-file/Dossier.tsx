import type { CaseFile } from "./types";

export function Dossier({ caseFile }: { caseFile: CaseFile }) {
  const { incident, coordinates } = caseFile;
  return (
    <article className="dossier">
      <div className="tape">EYES ONLY</div>
      <div className="photo">
        <div className="scanline" />
        <div className="sigil">{incident.sigil}</div>
        <div className="coordinates">{coordinates.latitude}<br />{coordinates.longitude}</div>
      </div>
      <dl className="case-meta">
        <div><dt>LOCATION</dt><dd>{incident.location}</dd></div>
        <div><dt>THREAT</dt><dd>{incident.threat}</dd></div>
        <div><dt>WITNESSES</dt><dd>{incident.witnesses}</dd></div>
      </dl>
      <div className="stamp">UNVERIFIED<br /><small>but concerning</small></div>
    </article>
  );
}
