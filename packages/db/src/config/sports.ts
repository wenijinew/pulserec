export type FieldType = "number" | "duration" | "select";

export interface SportField {
  name: string;
  label: string;
  type: FieldType;
  unit: string;
  min?: number;
  max?: number;
  step?: number;
  options?: string[]; // for select type
}

export interface SportConfig {
  id: string;
  name: string;
  icon: string;
  fields: SportField[];
}

export const sportsConfig: SportConfig[] = [
  {
    id: "basketball",
    name: "Basketball",
    icon: "🏀",
    fields: [
      { name: "points", label: "Points", type: "number", unit: "pts", min: 0, max: 100 },
      { name: "assists", label: "Assists", type: "number", unit: "ast", min: 0, max: 50 },
      { name: "rebounds", label: "Rebounds", type: "number", unit: "reb", min: 0, max: 40 },
      { name: "steals", label: "Steals", type: "number", unit: "stl", min: 0, max: 20 },
      { name: "blocks", label: "Blocks", type: "number", unit: "blk", min: 0, max: 20 },
    ],
  },
  {
    id: "football",
    name: "Football",
    icon: "⚽",
    fields: [
      { name: "goals", label: "Goals", type: "number", unit: "gls", min: 0, max: 20 },
      { name: "assists", label: "Assists", type: "number", unit: "ast", min: 0, max: 20 },
      { name: "passes", label: "Passes", type: "number", unit: "pas", min: 0, max: 200 },
      { name: "shots", label: "Shots", type: "number", unit: "sht", min: 0, max: 30 },
      { name: "distance", label: "Distance", type: "number", unit: "km", min: 0, max: 15, step: 0.1 },
    ],
  },
  {
    id: "pingpong",
    name: "Ping Pong",
    icon: "🏓",
    fields: [
      { name: "wins", label: "Wins", type: "number", unit: "W", min: 0, max: 50 },
      { name: "losses", label: "Losses", type: "number", unit: "L", min: 0, max: 50 },
      { name: "aces", label: "Aces", type: "number", unit: "ace", min: 0, max: 30 },
      { name: "smashes", label: "Smashes", type: "number", unit: "smh", min: 0, max: 50 },
    ],
  },
  {
    id: "handball",
    name: "Handball",
    icon: "🤾",
    fields: [
      { name: "goals", label: "Goals", type: "number", unit: "gls", min: 0, max: 30 },
      { name: "assists", label: "Assists", type: "number", unit: "ast", min: 0, max: 20 },
      { name: "saves", label: "Saves", type: "number", unit: "sav", min: 0, max: 30 },
      { name: "steals", label: "Steals", type: "number", unit: "stl", min: 0, max: 15 },
      { name: "blocks", label: "Blocks", type: "number", unit: "blk", min: 0, max: 15 },
    ],
  },
];

export function getSportConfig(id: string): SportConfig | undefined {
  return sportsConfig.find((s) => s.id === id);
}
