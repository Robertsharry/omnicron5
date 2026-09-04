import { useCallback, useEffect, useRef, useState } from "react";
import { AppHeader } from "../components/AppHeader";
import { CaseScreen } from "../features/case-file/CaseScreen";
import { formatDossier } from "../features/case-file/engine";
import { ResultScreen } from "../features/case-file/ResultScreen";
import type { Choice } from "../features/case-file/types";
import { useCaseGame } from "../features/case-file/useCaseGame";
import { Hero } from "../features/landing/Hero";
import { useSound } from "../hooks/useSound";
import { BackgroundField } from "../shared/BackgroundField";
import { RealityBreach } from "../shared/RealityBreach";
import { Toast } from "../shared/Toast";
import { copyText } from "../utils/clipboard";

export function App() {
  const { state, start: startGame, abandon, choose: chooseAction } = useCaseGame();
  const { enabled: soundEnabled, toggle: toggleSound, play } = useSound();
  const [breached, setBreached] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const notify = useCallback((message: string) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2400);
  }, []);

  const start = useCallback(() => {
    startGame();
    play(170, 0.12, "sawtooth");
  }, [play, startGame]);

  const choose = useCallback((choice: Choice, index: number) => {
    if (chooseAction(choice)) play(220 + index * 100, 0.1, index === 1 ? "square" : "sine");
  }, [chooseAction, play]);

  const copyDossier = useCallback(async () => {
    if (!state.caseFile) return;
    await copyText(formatDossier(state.caseFile, state.metrics));
    notify("DOSSIER COPIED. HANDLE IRRESPONSIBLY.");
  }, [notify, state.caseFile, state.metrics]);

  const breach = useCallback(() => {
    setBreached(true);
    play(70, 0.7, "sawtooth");
  }, [play]);

  const contain = useCallback(() => {
    setBreached(false);
    notify("CONTAINMENT SUCCESSFUL. PROBABLY.");
  }, [notify]);

  return (
    <>
      <BackgroundField />
      <div className="noise" aria-hidden="true" />
      <AppHeader soundEnabled={soundEnabled} onHome={abandon} onToggleSound={toggleSound} />
      <main>
        {state.status === "idle" && <Hero onBegin={start} />}
        {state.status === "active" && <CaseScreen state={state} onAbandon={abandon} onChoose={choose} />}
        {state.status === "complete" && <ResultScreen state={state} onAgain={start} onCopy={copyDossier} />}
      </main>
      <RealityBreach active={breached} onBreach={breach} onContain={contain} />
      <Toast message={toast} />
    </>
  );
}
