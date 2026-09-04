interface AppHeaderProps {
  soundEnabled: boolean;
  onHome: () => void;
  onToggleSound: () => void;
}

export function AppHeader({ soundEnabled, onHome, onToggleSound }: AppHeaderProps) {
  return (
    <header className="topbar">
      <button className="brand" onClick={onHome} aria-label="Return to the Bureau lobby">
        <span className="brand-mark">BII</span>
        <span className="brand-copy">Bureau of<br />Improbable Incidents</span>
      </button>
      <div className="status"><span className="pulse" /> REALITY: MOSTLY STABLE</div>
      <button className="sound-btn" onClick={onToggleSound} aria-label="Toggle sound">
        SOUND <span>{soundEnabled ? "ON" : "OFF"}</span>
      </button>
    </header>
  );
}
