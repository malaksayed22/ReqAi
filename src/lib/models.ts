import { AIModel } from "@/types";

export interface ModelConfig {
  id: AIModel;
  name: string;
  tagline: string;
  iconKey: "zap" | "sparkles" | "crown";
  speed: number;
  quality: number;
  accent: string;
  accentMuted: string;
  recommended?: boolean;
}

export const MODEL_CONFIGS: ModelConfig[] = [
  {
    id: "gpt-5-nano",
    name: "GPT-5 Nano",
    tagline: "Fastest & Cheapest",
    iconKey: "zap",
    speed: 98,
    quality: 52,
    accent: "#0ea5e9",
    accentMuted: "rgba(14,165,233,0.08)",
  },
  {
    id: "gpt-5-mini",
    name: "GPT-5 Mini",
    tagline: "Balanced Power",
    iconKey: "sparkles",
    speed: 75,
    quality: 82,
    accent: "#8b5cf6",
    accentMuted: "rgba(139,92,246,0.08)",
    recommended: true,
  },
  {
    id: "gpt-5",
    name: "GPT-5",
    tagline: "Best Quality",
    iconKey: "crown",
    speed: 40,
    quality: 98,
    accent: "#f59e0b",
    accentMuted: "rgba(245,158,11,0.08)",
  },
];

export function getModelConfig(id: AIModel): ModelConfig {
  return MODEL_CONFIGS.find((m) => m.id === id) ?? MODEL_CONFIGS[1];
}
