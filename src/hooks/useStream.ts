import { useState, useRef, useCallback } from "react";

interface UseStreamOptions {
  onComplete?: (fullText: string) => void;
  onError?: (msg: string) => void;
}

export function useStream({ onComplete, onError }: UseStreamOptions = {}) {
  const [streaming, setStreaming] = useState(false);
  const [text, setText] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const start = useCallback(
    async (prompt: string, model: string) => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      setStreaming(true);
      setText("");
      let fullText = "";

      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, model }),
          signal: ctrl.signal,
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error((err as { error?: string }).error ?? `Error ${res.status}`);
        }

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));
          for (const line of lines) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              if (json.type === "content_block_delta" && json.delta?.text) {
                fullText += json.delta.text;
                setText(fullText);
              }
            } catch {}
          }
        }

        onComplete?.(fullText);
      } catch (err: unknown) {
        if ((err as { name?: string })?.name === "AbortError") return;
        onError?.((err as Error)?.message ?? "Unknown error");
      } finally {
        setStreaming(false);
      }
    },
    [onComplete, onError]
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
    setStreaming(false);
  }, []);

  const reset = useCallback(() => {
    setText("");
  }, []);

  return { streaming, text, start, stop, reset };
}
