# ReqAI — Enterprise Requirements Studio

> Transform business problems into professional IT requirements documents using AI.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and the Google Gemini API (free tier).

---

## Features

- **Live AI Streaming** — Real-time SSE streaming from Claude Sonnet via a secure Edge API route
- **9-Section Requirements Document** — Project Overview, Business Objectives, Stakeholders, Functional & Non-Functional Requirements, Tech Stack, Timeline, Risk Assessment, Success Metrics
- **Professional Document Rendering** — Intelligent content parsing with numbered lists, key-value chips, risk tables, and phase timelines
- **Export** — Copy as Markdown or Export to PDF (print-optimized CSS)
- **Dark / Light Mode** — Persisted to localStorage, system-aware
- **Sticky TOC Sidebar** — Section navigation with smooth scroll
- **Fully Typed** — TypeScript throughout

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Fonts | Geist + Geist Mono (next/font) |
| AI | Google Gemini 2.0 Flash (SSE streaming) |
| Icons | Lucide React |
| Runtime | Edge (API route) |

---

## Getting Started

### 1. Clone & Install

```bash
git clone <repo>
cd reqai
npm install
```

### 2. Configure Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Anthropic API key:

```
GEMINI_API_KEY=sk-ant-...
```

Get your key at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
├── app/
│   ├── api/generate/route.ts   # Edge API route (SSE proxy to Anthropic)
│   ├── globals.css             # Tailwind + keyframe animations
│   ├── layout.tsx              # Root layout with Geist fonts & metadata
│   └── page.tsx                # Main page (view orchestrator)
├── components/
│   ├── document/
│   │   ├── ResultsView.tsx     # Results layout: stat strip, sidebar, cards
│   │   ├── SectionCard.tsx     # Individual section card with icon + badge
│   │   ├── SectionBody.tsx     # Smart content renderer (bullets, tables, phases)
│   │   └── Sidebar.tsx         # Sticky TOC with active section tracking
│   └── ui/
│       ├── Navbar.tsx          # Sticky nav with theme toggle
│       ├── InputView.tsx       # Hero, textarea, example chips, CTA
│       └── GeneratingView.tsx  # Streaming preview + progress steps
├── hooks/
│   ├── useStream.ts            # SSE streaming hook with abort support
│   └── useTheme.ts             # Dark/light theme with localStorage
├── lib/
│   ├── parse.ts                # Document parser (### → sections)
│   └── sections.ts             # Section config, system prompt, examples
└── types/
    └── index.ts                # Shared TypeScript types
```

---

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Set `GEMINI_API_KEY` in the Vercel dashboard under Project → Settings → Environment Variables.

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | ✅ | Your Anthropic API key |

---

## License

MIT
