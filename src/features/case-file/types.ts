export type GameStatus = "idle" | "active" | "complete";

export interface Incident {
  title: string;
  dispatch: string;
  location: string;
  threat: string;
  witnesses: string;
  sigil: string;
}

export interface Metrics {
  nerve: number;
  weird: number;
  paper: number;
}

export type MetricDelta = readonly [nerve: number, weird: number, paper: number];

export interface Choice {
  text: string;
  delta: MetricDelta;
  log: string;
}

export interface CaseFile {
  id: string;
  incident: Incident;
  coordinates: { latitude: string; longitude: string };
}

export interface Assessment {
  grade: string;
  title: string;
  text: string;
  quote: string;
}

export interface GameState {
  status: GameStatus;
  caseFile: CaseFile | null;
  phaseIndex: number;
  metrics: Metrics;
  logs: string[];
  choices: string[];
  dispatch: string;
  locked: boolean;
}
