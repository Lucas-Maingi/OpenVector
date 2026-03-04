# OpenVector Engine Guide

Welcome to the technical core of OpenVector. This document details the "nuts and bolts" of how our OSINT engine aggregates, correlates, and synthesizes intelligence data.

---

## 1. Data Sources & API Strategy

The OpenVector engine utilizes a multi-layered connector architecture. We prioritize **Free and Open-Source Intelligence (FOSI)** data to ensure accessibility while maintaining high reliability.

### Core Connectors

| Connector | Source | Purpose | Data Quality |
|---|---|---|---|
| **Username Search** | GitHub, Twitter, Reddit, etc. | Cross-platform digital profiling. | **High**: Real-time URL resolution. |
| **Breach Search** | HIBP, Dehashed, IntelX | Identifying exposed credentials. | **Critical**: Secure pattern matching. |
| **Domain Search** | SecurityTrails, WHOIS | Infrastructure footprinting. | **High**: Authoritative DNS records. |
| **Google Dorks** | Google Search API | Deep indexing of public leaks/pastes. | **Variable**: Requires intelligent filtering. |
| **Reverse Image** | TinEye, Google Lens | Visual asset correlation. | **Medium**: Pattern matching heuristic. |

### Free vs. Paid
- **Free Layer**: All connectors are built to work with public endpoints and free-tier APIs.
- **Reliability**: We use multiple providers for the same data type (e.g., three breach aggregators) to ensure high uptime.

---

## 2. Intelligence Correlation Logic

The "Magic" of OpenVector is how it moves from a single data point to a web of correlated data.

### Identification Pipeline
1. **The Seed**: You enter an Email, Username, or Domain.
2. **Horizontal Expansion**: The engine sweeps 25+ platforms simultaneously for that identifier (e.g., if you enter a username, it checks GitHub, LinkedIn, and TikTok).
3. **Vertical Pivot**: 
    - Found a GitHub profile? The engine extracts the **real name** or **location** from that profile.
    - Found a LinkedIn profile? The engine extracts the **employer** or **professional connections**.
4. **Linkage**: These new identifiers are fed back into the search loop for a secondary sweep.

---

## 3. The AI Analyst (GPT-4o Integration)

The AI is not just summarizing; it is **synthesizing**.

### Guardrails & Instructions
- **Instruction**: "Act as a Lead OSINT Analyst. Ignore false positives (e.g., generic names). Focus on unique identifiers and security risks."
- **Privacy Guardrail**: The AI is strictly forbidden from inferring sensitive personal information not found in the raw data (no "guessing" addresses).
- **Quality Check**: The AI verifies if the findings across multiple connectors contradict each other (e.g., a person claimed to be in London on X but Tokyo on Instagram).

---

## 4. Technical Nuts & Bolts (App Architecture)

- **Frontend**: Next.js 15 (App Router) for high-performance server-side rendering.
- **Database**: Prisma + Supabase PostgreSQL for secure user records and investigation persistence.
- **Middleware**: Custom Auth Bridge that allows **Guest Mode** for immediate testing while keeping private investigations locked to accounts.

---

## 5. Implementation Path

If you are looking to extend the engine:
1.  **Add a Connector**: Create a new file in `src/connectors/`.
2.  **Export the Type**: Ensure it returns a `ConnectorResult`.
3.  **Update the Orchestrator**: Add the call in `src/app/api/investigations/[id]/scan/route.ts`.

OpenVector is built to be a **force multiplier**—doing 4 hours of manual Googling in 4 seconds.
