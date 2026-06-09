import { ParsedSection } from "@/types";
import { SECTION_CONFIG } from "./sections";

export function parseDocument(text: string): ParsedSection[] {
  const parts = text.split(/^### /m).filter(Boolean);
  return parts.map((part) => {
    const nl = part.indexOf("\n");
    const title = (nl === -1 ? part : part.slice(0, nl)).trim();
    const content = nl === -1 ? "" : part.slice(nl + 1).trim();
    const cfg = SECTION_CONFIG[title] ?? {
      iconKey: "fileText" as const,
      accent: "#6366f1",
      label: "Section",
    };
    return { title, content, ...cfg };
  });
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}
