"use client";
import {
  FileText, Target, Users, CheckCircle, Shield,
  Layers, Clock, AlertTriangle, TrendingUp, LucideIcon,
} from "lucide-react";
import { ParsedSection, SectionIconKey } from "@/types";
import { SectionBody } from "./SectionBody";

const ICON_MAP: Record<SectionIconKey, LucideIcon> = {
  fileText: FileText,
  target: Target,
  users: Users,
  checkCircle: CheckCircle,
  shield: Shield,
  layers: Layers,
  clock: Clock,
  alertTriangle: AlertTriangle,
  trendingUp: TrendingUp,
};

interface SectionCardProps {
  section: ParsedSection;
  index: number;
  theme: "dark" | "light";
}

export function SectionCard({ section, index, theme }: SectionCardProps) {
  const Icon = ICON_MAP[section.iconKey] ?? FileText;
  const dark = theme === "dark";

  return (
    <div
      id={`sec-${section.title.replace(/\s+/g, "-")}`}
      className="rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-lg group"
      style={{
        borderColor: dark ? "#1e293b" : "#e2e8f0",
        borderLeft: `3px solid ${section.accent}`,
        background: dark ? "rgba(15,23,42,0.7)" : "#ffffff",
        animationName: "slideUp",
        animationDuration: "0.4s",
        animationFillMode: "both",
        animationTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Card header */}
      <div
        className="flex items-center gap-3 px-5 py-4 border-b"
        style={{ borderColor: dark ? "#1e293b" : "#e2e8f0" }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${section.accent}15`, border: `1px solid ${section.accent}30` }}
        >
          <Icon size={15} style={{ color: section.accent }} strokeWidth={1.75} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-bold tracking-tight truncate ${dark ? "text-white" : "text-slate-900"}`}>
            {section.title}
          </h3>
        </div>

        <span
          className="flex-shrink-0 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
          style={{
            color: section.accent,
            borderColor: `${section.accent}30`,
            background: `${section.accent}10`,
          }}
        >
          {section.label}
        </span>
      </div>

      {/* Card body */}
      <div className="px-5 py-4">
        <SectionBody content={section.content} accent={section.accent} />
      </div>
    </div>
  );
}
