"use client";
import { useState, useCallback } from "react";
import { View, AIModel } from "@/types";
import { parseDocument, countWords } from "@/lib/parse";
import { useStream } from "@/hooks/useStream";
import { useTheme } from "@/hooks/useTheme";
import { Navbar } from "@/components/ui/Navbar";
import { InputView } from "@/components/ui/InputView";
import { GeneratingView } from "@/components/ui/GeneratingView";
import { ResultsView } from "@/components/document/ResultsView";

export default function Home() {
  const { theme, toggle: toggleTheme, isDark } = useTheme();
  const [view, setView] = useState<View>("input");
  const [selectedModel, setSelectedModel] = useState<AIModel>("gpt-5-mini");
  const [rawDocument, setRawDocument] = useState("");
  const [parsedSections, setParsedSections] = useState([] as ReturnType<typeof parseDocument>);
  const [generatedAt, setGeneratedAt] = useState<Date | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [apiError, setApiError] = useState<string | null>(null);

  const { text: streamText, start: startStream, reset: resetStream } = useStream({
    onComplete: (fullText) => {
      setRawDocument(fullText);
      setParsedSections(parseDocument(fullText));
      setWordCount(countWords(fullText));
      setGeneratedAt(new Date());
      setView("results");
    },
    onError: (msg) => {
      setApiError(msg);
      setView("results");
    },
  });

  const handleGenerate = useCallback((prompt: string) => {
    setView("generating");
    setApiError(null);
    setRawDocument("");
    setParsedSections([]);
    resetStream();
    startStream(prompt, selectedModel);
  }, [startStream, resetStream, selectedModel]);

  const handleReset = useCallback(() => {
    setView("input");
    setRawDocument("");
    setParsedSections([]);
    setApiError(null);
    resetStream();
  }, [resetStream]);

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ background: isDark ? "#060a14" : "#f8fafc", fontFamily: "var(--font-geist)" }}
    >
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        showReset={view !== "input"}
        onReset={handleReset}
        selectedModel={selectedModel}
      />

      {view === "input" && (
        <InputView
          theme={theme}
          onGenerate={handleGenerate}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
        />
      )}

      {view === "generating" && (
        <GeneratingView theme={theme} streamText={streamText} />
      )}

      {view === "results" && (
        <ResultsView
          theme={theme}
          sections={parsedSections}
          rawDocument={rawDocument}
          generatedAt={generatedAt}
          wordCount={wordCount}
          error={apiError}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
