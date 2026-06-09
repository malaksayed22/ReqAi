import { SectionConfig } from "@/types";

export const SECTION_CONFIG: Record<string, SectionConfig> = {
  "Project Overview":            { iconKey: "fileText",      accent: "#6366f1", label: "Overview"       },
  "Business Objectives":         { iconKey: "target",        accent: "#10b981", label: "Objectives"     },
  "Stakeholders":                { iconKey: "users",         accent: "#f59e0b", label: "Stakeholders"   },
  "Functional Requirements":     { iconKey: "checkCircle",   accent: "#ef4444", label: "Functional"     },
  "Non-Functional Requirements": { iconKey: "shield",        accent: "#3b82f6", label: "Non-Functional" },
  "Recommended Tech Stack":      { iconKey: "layers",        accent: "#8b5cf6", label: "Tech Stack"     },
  "Estimated Timeline":          { iconKey: "clock",         accent: "#06b6d4", label: "Timeline"       },
  "Risk Assessment":             { iconKey: "alertTriangle", accent: "#f97316", label: "Risks"          },
  "Success Metrics":             { iconKey: "trendingUp",    accent: "#22c55e", label: "Metrics"        },
};

export const SYSTEM_PROMPT = `You are a senior IT consultant and enterprise solution architect at a top-tier digital transformation consultancy. The user will describe a business problem or project. Generate a structured, executive-ready IT Requirements Document.

Use EXACTLY these section headers with ### prefix:

### Project Overview
2–3 concise sentences summarizing the initiative, business context, and primary outcome.

### Business Objectives
- List 4–5 measurable strategic goals

### Stakeholders
- List each role with their key interest/concern (e.g., "CTO – Concerned with scalability and vendor lock-in")

### Functional Requirements
1. Numbered list of 6–8 specific, testable functional requirements

### Non-Functional Requirements
- Performance: [specifics]
- Security: [specifics]
- Scalability: [specifics]
- Availability: [specifics, e.g., 99.9% SLA]
- Compliance: [relevant standards]

### Recommended Tech Stack
- Frontend: [technology] — [justification]
- Backend: [technology] — [justification]
- Database: [technology] — [justification]
- Cloud: [provider/services] — [justification]
- DevOps: [tools] — [justification]
- AI/ML: [if applicable] — [justification]

### Estimated Timeline
- Phase 1 – [Name] ([duration]): [key deliverables]
- Phase 2 – [Name] ([duration]): [key deliverables]
- Phase 3 – [Name] ([duration]): [key deliverables]

### Risk Assessment
- Risk: [name] | Likelihood: High/Medium/Low | Impact: High/Medium/Low | Mitigation: [strategy]
List 3–4 risks.

### Success Metrics
- [Metric]: [measurable target, e.g., "Reduce ticket resolution time by 40% within 6 months"]
List 4–5 KPIs.

Respond ONLY with the document. No preamble. No markdown fences. Use plain ### headers exactly as shown.`;

export const EXAMPLES = [
  {
    label: "Legacy ERP → Cloud",
    icon: "layers" as const,
    text: "Our company runs a 12-year-old SAP ERP system hosted on-premise with no REST API layer. We need to migrate to a cloud-native ERP on AWS, expose APIs for our mobile sales app, integrate with our existing Salesforce CRM, and ensure zero downtime during migration. 200 concurrent users globally.",
  },
  {
    label: "IoT Fleet Intelligence",
    icon: "zap" as const,
    text: "We manage a fleet of 500 delivery trucks across 3 countries. We need a real-time IoT dashboard that ingests GPS, fuel, and engine telemetry from vehicle sensors, displays live maps and alerts, stores historical data for predictive maintenance, and sends automated SMS/email alerts on anomalies.",
  },
  {
    label: "AI Customer Support",
    icon: "sparkles" as const,
    text: "We handle 10,000 support tickets per month manually. We need an AI-powered platform that auto-classifies incoming tickets, suggests responses from our knowledge base, escalates complex cases to human agents, integrates with Zendesk, and provides analytics on resolution time and CSAT scores.",
  },
];
