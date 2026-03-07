import { GoogleGenerativeAI } from "@google/generative-ai";

export async function summarizeFindings(investigationTitle: string, evidenceItems: { title: string, content: string }[], customApiKey?: string) {
    const apiKey = customApiKey || process.env.GEMINI_API_KEY;

    // If no API key, return an explicit error instead of a silent simulation
    if (!apiKey) {
        return `### ⚠️ AI Synthesis Unavailable (API Key Missing)

OpenVector successfully completed the OSINT scan and gathered ${evidenceItems.length} evidence pieces, but the intelligence synthesis could not be generated.

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

        const evidenceStr = evidenceItems.slice(0, 30).map(e => `- ${e.title}: ${e.content}`).join("\n");

        const genAI = new GoogleGenerativeAI(apiKey);

        const systemPrompt = `You are an elite cybersecurity OSINT analyst. Your task is to synthesize raw intelligence fragments into a professional, highly-structured Threat Intelligence Dossier. 

CRITICAL INSTRUCTIONS:
- DO NOT write a generic, theoretical story. 
- You MUST extract and list the ACTUAL hard data points from the provided evidence (e.g., specific IP addresses, subdomains, registration dates, server locations).
- Ignore generic "OSINT Vector Search" dork templates unless they contain real data.
- Format the response beautifully using Markdown. 

Structure the Dossier exactly as follows:
1. **Executive Summary**: A brief, hard-hitting summary of the target's verified exposure.
2. **Infrastructure Analysis**: List the specific IPs, servers, DNS records, and geographic locations found in the evidence.
3. **Identity & Breach Vectors**: List any specific emails, usernames, social profiles, or breach indicators found.
4. **Analyst Recommendations**: Provide 2-3 specific, actionable next steps based on the *actual* data found (not generic advice).

Tone: Clinical, objective, data-driven.
`;
        const prompt = `${systemPrompt}\nAnalyze the following OSINT findings for Operation "${investigationTitle}":\n\n${evidenceStr}\n\nGenerate the complete Threat Intelligence Dossier.`;

        // Auto-failover array because Google frequently deprecates/renames models
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
                // If the model is not found, try the next one
                if (err?.status === 404 || err?.message?.includes('404') || err?.message?.includes('not found')) {
                    continue;
                }
                throw err; // If it's a quota or other error, throw immediately
            }
        }

        if (!result) {
            throw lastError || new Error("All Gemini models returned 404 Not Found.");
        }

        return result.response.text();
    } catch (error: any) {
        console.error("AI Synthesis failed:", error);
        return `### AI Synthesis Failed\n\nOpenVector attempted to generate the Threat Intelligence Dossier, but the Gemini API rejected the request. Please verify your \`GEMINI_API_KEY\` environment variable in Vercel.\n\n**Error Details:**\n\`\`\`text\n${error?.message || String(error)}\n\`\`\``;
    }
}
