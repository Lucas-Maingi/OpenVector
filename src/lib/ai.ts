import { GoogleGenerativeAI } from "@google/generative-ai";

export async function summarizeFindings(investigationTitle: string, evidenceItems: { title: string, content: string }[], customApiKey?: string) {
    const apiKey = customApiKey || process.env.GEMINI_API_KEY;

    // If no API key, return a high-quality simulated synthesis
    if (!apiKey) {
        const categories = [...new Set(evidenceItems.flatMap(e => (e as any).tags?.split(',') || []))].filter(Boolean);
        const platformCount = new Set(evidenceItems.map(e => (e as any).title?.split(' — ')[0])).size;

        return `### Automated OSINT Synthesis for ${investigationTitle}

**Overview**: Based on the collection of ${evidenceItems.length} evidence nodes across ${platformCount} platforms, the target shows a ${evidenceItems.length > 5 ? 'significant' : 'moderate'} digital footprint.

**Data Categories Analyzed**:
${categories.map(c => `- ${c.charAt(0).toUpperCase() + c.slice(1)} Intelligence`).join('\n')}

**Initial Intelligence Summary**:
- **Identity Nodes**: Found ${evidenceItems.filter(e => (e as any).tags?.includes('social') || (e as any).tags?.includes('developer')).length} profile matches across major platforms.
- **Exposure Risk**: ${evidenceItems.some(e => (e as any).tags?.includes('breach')) ? 'Confirmed potential exposure in data breaches (see Breach tab).' : 'No critical data breaches detected in the initial sweep.'}
- **Infrastructure**: ${evidenceItems.some(e => (e as any).tags?.includes('domain')) ? 'Infrastructure nodes identified including subdomains and DNS history.' : 'Limited infrastructure exposure detected.'}

**Analyst Recommendation**: Proceed with manual verification of the identified social nodes and check for cross-platform activity timestamps to establish a pattern of life. Upgrade to OpenVector AI Pro for full behavioral analysis and deep-web entity mapping.`;
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
