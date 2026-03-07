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
        // Using gemini-1.5-flash for speed and cost-efficiency (100% free tier)
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: "You are an elite cybersecurity OSINT analyst. Your task is to synthesize raw intelligence fragments into a professional, highly-structured Threat Intelligence Dossier. Format the response beautifully using Markdown (headers, bullet points, bold text). Start with an 'Executive Summary', followed by 'Key Vectors', a 'Risk Assessment', and 'Analyst Recommendations'. Write in a clinical, objective intelligence tone."
        });

        const prompt = `Analyze the following OSINT findings for Operation "${investigationTitle}":\n\n${evidenceStr}\n\nGenerate the complete Threat Intelligence Dossier.`;

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.3, // Low temperature for factual reporting
            }
        });

        return result.response.text();
    } catch (error: any) {
        console.error("AI Synthesis failed:", error);
        return `### AI Synthesis Failed\n\nOpenVector attempted to generate the Threat Intelligence Dossier, but the Gemini API rejected the request. Please verify your \`GEMINI_API_KEY\` environment variable in Vercel.\n\n**Error Details:**\n\`\`\`text\n${error?.message || String(error)}\n\`\`\``;
    }
}
