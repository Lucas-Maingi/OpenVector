import { GoogleGenerativeAI } from "@google/generative-ai";

export async function summarizeFindings(investigationTitle: string, evidenceItems: { title: string, content: string, confidenceLabel?: string, confidenceScore?: number }[], customApiKey?: string) {
    const apiKey = customApiKey || process.env.GEMINI_API_KEY;

    // If no API key, return an explicit error instead of a silent simulation
    if (!apiKey) {
        return `### ⚠️ AI Synthesis Unavailable (API Key Missing)

Aletheia successfully completed the OSINT scan and gathered ${evidenceItems.length} evidence pieces, but the intelligence synthesis could not be generated.

The Google Gemini API key is missing or invalid.

**How to fix:**
1. Check that you copied the key correctly from Google AI Studio.
2. Ensure you went to Vercel -> Settings -> Environment Variables and saved it as \`GEMINI_API_KEY\`.
3. **CRITICAL:** In Vercel, you must go to the **Deployments** tab and click **Redeploy** after adding a new environment variable, otherwise the production server won't see it.
4. Once redeployed, hit **Retry Scan** to generate your dossier.`;
    }

    try {
        if (evidenceItems.length === 0) {
            return `### Intelligence Scan Complete\n\nThe target \`${investigationTitle}\` yielded 0 active digital footprints across the selected public OSINT nodes. \n\n**Analyst Recommendation**: Try scanning a related username or email to pivot the investigation.`;
        }

        const evidenceStr = evidenceItems.slice(0, 30).map(e => `- [${e.confidenceLabel || 'UNRATED'} Confidence (${Math.round((e.confidenceScore || 0) * 100)}%)] ${e.title}: ${e.content}`).join("\n");

        const genAI = new GoogleGenerativeAI(apiKey);

        const systemPrompt = `You are Aletheia — a high-fidelity intelligence orchestration engine. Your mission is to extract actionable signal from noise. 

Internal Agent Specializations:
- **BioAgent (Biography & Identity)**: Map full names, birthdates, education, and career trajectories.
- **NetworkAgent (Connectivity)**: Identify linked associates, mutual connections, and social cluster concentrations.
- **GeoAgent (Location Intelligence)**: Extract physical addresses, frequent check-ins, or region-based identifiers.
- **InfraAgent (Technical Recon)**: Map domains, IPs, WHOIS metadata, and hosting infrastructure.
- **LeakAgent (Vulnerability & Compromise)**: Correlate credentials found in breach datasets and password markers.

CRITICAL INSTRUCTIONS:
- PRIORITY: If you find an email, phone number, or IP, highlight it as a "Primary Pivot".
- CONNECTIVITY: If multiple agents find overlapping data (e.g., a username on GitHub and a related repo on GitLab), synthesize the link.
- ZERO FILLER: Do not use preamble or "In conclusion". Deliver raw, high-signal intelligence.
- SOURCING: If evidence mentions a specific source (Interpol, Dark Web, DNS), cite it in the dossier.

Structure:
1. **Executive Dossier**: High-level exposure score and verified critical findings.
2. **Identity & Bio Profile**: Comprehensive reconstruction of the target's biography.
3. **Connectivity Grid**: Associates, linked usernames, and mutual connections.
4. **Digital Footprint (Infra/Geo)**: Technical infrastructure and physical region mapping.
5. **Exposure Map**: Breaches, leaks, and potential compromise vectors.
6. **Next-Phase Pivots**: 3 specific, recursive queries to further penetrate the target's anonymity.

[SIGINT_GEO_EXTRACTION]: 
At the EXTREME END of your response, after all markdown, include exactly one JSON block in this format: 
[SIGINT_GEO: {"locations": [{"city": "string", "country": "string", "lat": number, "lng": number, "source": "string"}]}]
Only include verified or high-probability locations found in the evidence.

[VITALITY_AUDIT_EXTRACTION]:
Immediately following the geo-block, include exactly one JSON block in this format:
[VITALITY_AUDIT: {"verdict": "Real" | "Synthetic" | "Suspicious", "confidence": number, "markers": ["string"]}]
Analyze visual evidence descriptions for GAINs, diffusion artifacts, or identity inconsistencies.

[ASSOCIATE_ANALYSIS_EXTRACTION]:
Immediately following the vitality-block, include exactly one JSON block in this format:
[ASSOCIATES: {"associates": [{"name": "string", "handle": "string", "relationship": "string", "confidence": number, "reasoning": "string"}]}]
Identify entities that lack formal links but show high patterns of proximity or mutual interactions.

Tone: Clinical, precise, and intelligence-grade.`;
        const prompt = `${systemPrompt}\nAnalyze the following OSINT findings for Operation "${investigationTitle}":\n\n${evidenceStr}\n\nGenerate the complete Threat Intelligence Dossier.`;

        const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
        let result;
        let lastError;

        for (const modelName of models) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                result = await model.generateContent({
                    contents: [{ role: "user", parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.3,
                    }
                });
                break; // Break loop if successful
            } catch (err: any) {
                console.warn(`Model ${modelName} failed:`, err.message);
                lastError = err;
                
                const isNotFound = err?.status === 404 || err?.message?.includes('404') || err?.message?.includes('not found');
                const isCapacityExhausted = err?.status === 503 || err?.message?.includes('503') || err?.message?.includes('MODEL_CAPACITY_EXHAUSTED') || err?.message?.includes('ResourceHasBeenExhausted');
                const isRateLimited = err?.status === 429 || err?.message?.includes('429') || err?.message?.includes('quota');

                // If the model is not found or overloaded, try the next one in the fallback list
                if (isNotFound || isCapacityExhausted || isRateLimited) {
                    continue;
                }
                
                // If it's another hard error (like bad API key), throw immediately
                throw err; 
            }
        }

        if (!result) {
            throw lastError || new Error("All Gemini models failed (Capacity/Quota Exhausted or Not Found).");
        }

        return result.response.text();
    } catch (error: any) {
        console.error("AI Synthesis failed:", error);
        return `### AI Synthesis Failed\n\nAletheia attempted to generate the Intelligence Dossier, but the Gemini API rejected the request. Please verify your \`GEMINI_API_KEY\` environment variable in Vercel.\n\n**Error Details:**\n\`\`\`text\n${error?.message || String(error)}\n\`\`\``;
    }
}
