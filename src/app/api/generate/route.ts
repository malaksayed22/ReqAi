import { NextRequest } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/sections";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { prompt, model } = await req.json();

  if (!prompt?.trim()) {
    return new Response(JSON.stringify({ error: "Prompt is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "OPENAI_API_KEY is not set in .env.local" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const selectedModel = model || "gpt-5-mini";

  const upstream = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: selectedModel,
      instructions: SYSTEM_PROMPT,
      input: prompt,
      stream: true,
    }),
  });

  if (!upstream.ok) {
    const errBody = await upstream.json().catch(() => ({}));
    const message = (errBody as { error?: { message?: string } })?.error?.message ?? `Error ${upstream.status}`;
    return new Response(JSON.stringify({ error: message }), {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Responses API SSE — delta text lives in json.delta on response.output_text.delta events
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader();
      const decoder = new TextDecoder();

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

          for (const line of lines) {
            const data = line.slice(6).trim();
            if (!data || data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              const text: string = json?.delta ?? "";
              if (text) {
                const payload = JSON.stringify({
                  type: "content_block_delta",
                  delta: { text },
                });
                controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
              }
            } catch {}
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
