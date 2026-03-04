# OpenVector Technical Deep-Dive & Engine Guide

This document provides a comprehensive "nuts and bolts" overview of the OpenVector engine. It is designed to help engineers and users fully understand how data is aggregated, correlated, and synthesized to provide actionable OSINT intelligence.

---

## 1. Core Engine Architecture

OpenVector is built on a **Modular Connector System**. Each connector is an isolated function that knows how to query a specific type of data source (e.g., social platforms, breach databases, or search engines).

### Data Aggregation Layer (The Connectors)

| Data Source Category | Specific Platforms / APIs | Primary Utility | Reliability / Quality |
|---|---|---|---|
| **Social Identifier Sweep** | GitHub, Twitter, Reddit, LinkedIn, Telegram, etc. | Finding "Linkable Identities" (profiles linked by the same username). | **High**: Direct URL verification via platform-specific paths. |
| **Credential Breach Analysis** | HaveIBeenPwned, Dehashed, LeakCheck, IntelX | Identifying leaked credentials and historical password patterns. | **Critical**: High-integrity data from historical leak dumps. |
| **Infrastructure & Domains** | SecurityTrails, WHOIS, DNS Records | Footprinting the digital infrastructure (IPs, Mail Servers) associated with a target. | **High**: Authoritative registers are used for mapping. |
| **Content Dorking** | Google Custom Search API, Pastebin Search | Scraping indexed pastes, public leaks, and hidden document metadata. | **Variable**: Requires AI filtering to separate noise from signal. |
| **Visual Correlation** | TinEye, Google Lens, Yandex Image | Cross-referencing subject avatars to find secondary personas. | **Medium**: Pattern matching heuristic for discovery. |

**Data Source Reliability**: We focus on **Free & Open-Source (FOSI)** sources. This ensures that the tool is accessible and audit-ready. For critical searches (like breaches), we utilize multiple providers to provide a "Consensus" score.

---

## 2. Intelligence Correlation Logic (The Breadth-First Sweep)

The engine doesn't just "search"—it **correlates**.

### The Identifier Pivot
When you provide a "Seed" (e.g., an email address), the engine performs a **recursive pivot**:
1.  **Stage 1: Identity Detection**: The email is checked across 20+ social sites.
2.  **Stage 2: Metadata Extraction**: If a GitHub profile is found, the engine extracts the `name`, `company`, `location`, and `public_gpg_keys`.
3.  **Stage 3: Secondary Pivoting**: These new data points (e.g., the real name) are automatically fed back into the search loop. 
    *   *Example*: Email → GitHub Profile → Real Name → LinkedIn Profile → Current Employer.
4.  **Correlation Mapping**: The engine groups these findings into a single "Identity Node" within the dashboard.

---

## 3. The AI Intelligence Analyst (GPT-4o)

The AI is the "Brain" that sits on top of the raw data.

### Agent Logic & Guardrails
- **Prompt Engineering**: The agent is instructed to focus on **high-value correlations**. It ignores "False Positives" (e.g., common names like 'John Smith' unless other identifiers match).
- **Expansion Logic**: The agent uses logic to infer relationships. If three different social profiles have the same profile picture and mention 'Python Developer', the agent assigns a high confidence score to the link.
- **Guardrails**:
    - **No Hallucination**: The agent is prohibited from "guessing" missing data. It only summarizes what it sees in the raw connector output.
    - **PII Sensitivity**: The agent summarizes findings into a "Risk Profile" but does not expose clear-text private credentials (like passwords) directly in the summary.
    - **Context Awareness**: The agent understands the difference between a "Personal" profile and a "Business" profile and tags them accordingly.

---

## 4. Operational "Nuts and Bolts"

### The Request Flow
1.  **Client Triggers Scan**: The dashboard sends a request to `/api/investigations/[id]/scan`.
2.  **Orchestrator Sequence**: The `scan/route.ts` orchestrator initiates all enabled connectors in parallel.
3.  **Database Persistence**: Results are streamed into the `Evidence` table in Prisma.
4.  **AI Synthesis**: Once all evidence is gathered, a batch of metadata is sent to OpenAI to generate the markdown report.
5.  **UI Updates**: The dashboard refreshes to show the gathered entities and the AI-generated intelligence brief.

---

## 5. Security & Privacy Model

- **Data Encapsulation**: Results are stored in the `users` private investigation table.
- **Guest vs. Account**: We support **Guest Mode** for immediate tool testing. Guest data is shared among testers—for private data, users **must** create an account.
- **Database Resilience**: We use Prisma to bridge Supabase Auth with our core app data, ensuring that your investigations are yours alone.
