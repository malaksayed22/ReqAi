export interface ParsedSection {
  title: string;
  content: string;
  iconKey: SectionIconKey;
  accent: string;
  label: string;
}

export type SectionIconKey =
  | "fileText"
  | "target"
  | "users"
  | "checkCircle"
  | "shield"
  | "layers"
  | "clock"
  | "alertTriangle"
  | "trendingUp";

export interface SectionConfig {
  iconKey: SectionIconKey;
  accent: string;
  label: string;
}

export type View = "input" | "generating" | "results";
export type Theme = "dark" | "light";
export type AIModel = "gpt-5-nano" | "gpt-5-mini" | "gpt-5";
