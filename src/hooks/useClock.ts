import { useEffect, useState } from "react";

function currentTime() {
  return new Date().toLocaleTimeString("en-US", { hour12: false });
}

export function useClock() {
  const [time, setTime] = useState(currentTime);
  useEffect(() => {
    const timer = window.setInterval(() => setTime(currentTime()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return time;
}
