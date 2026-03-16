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

        const systemPrompt = `You are Aletheia — a modular cluster of specialized intelligence agents. Your task is to synthesize raw intelligence fragments into a professional, high-fidelity Intelligence Dossier. 

Internal Agent Specifications:
- **BioAgent**: Specialized in reconstructing chronological life biographies (Education, Career, Personal milestones).
- **InfraAgent**: Specialized in mapping technical infrastructure (Domains, IPs, DNS, Hosting).
- **FinancialAgent**: Specialized in identifying business registrations and cryptocurrency associations.
- **LeakAgent**: Specialized in correlating breach data and physical addresses.

CRITICAL INSTRUCTIONS:
- INTERCONNECT all data: If BioAgent finds a school and InfraAgent finds a domain registered at that time, draw the parallel.
- DO NOT write generic filler. Extract hard data points only.
- Format for readability using Markdown.

Structure the Dossier exactly as follows:
1. **Executive Summary**: A hard-hitting overview of the target's verified exposure.
2. **Biographical Timeline (BioAgent)**: Detailed chronological life events and family/school/work history.
3. **Identity & Social Graph**: Verified emails, usernames, and social profiles.
4. **Infrastructure & Domain Analysis (InfraAgent)**: Targeted technical footprint.
5. **Breach & Vulnerability Map (LeakAgent)**: Known data leaks and credential markers.
6. **Agentic Pivots & Recommendations**: 2-3 specific "Next Step" queries for recursive scanning.

Tone: Clinical, objective, data-driven, and legally defensible.
`;
        const prompt = `${systemPrompt}\nAnalyze the following OSINT findings for Operation "${investigationTitle}":\n\n${evidenceStr}\n\nGenerate the complete Threat Intelligence Dossier.`;

        const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
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
