import { useCallback, useEffect, useRef, useState } from "react";

export function useSound() {
  const [enabled, setEnabled] = useState(false);
  const context = useRef<AudioContext | null>(null);

  useEffect(() => () => { void context.current?.close(); }, []);

  const play = useCallback((frequency = 280, duration = 0.06, type: OscillatorType = "sine") => {
    if (!enabled) return;
    context.current ??= new AudioContext();
    const audio = context.current;
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    gain.gain.setValueAtTime(0.045, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duration);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start();
    oscillator.stop(audio.currentTime + duration);
  }, [enabled]);

  const toggle = useCallback(() => setEnabled(value => !value), []);
  return { enabled, toggle, play };
}
