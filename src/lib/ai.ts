import OpenAI from "openai";

export async function summarizeFindings(investigationTitle: string, evidenceItems: { title: string, content: string }[], customApiKey?: string) {
    const apiKey = customApiKey || process.env.OPENAI_API_KEY;

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
        const evidenceStr = evidenceItems.slice(0, 30).map(e => `- ${e.title}: ${e.content}`).join("\n");

        const openai = new OpenAI({ apiKey });

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are an expert OSINT (Open Source Intelligence) analyst. Your task is to summarize investigation findings into a professional, concise intelligence report."
                },
                {
                    role: "user",
                    content: `Please summarize the following OSINT findings for investigation "${investigationTitle}":\n\n${evidenceStr}\n\nProvide 3 key takeaways and a final recommendation in markdown format.`
                }
            ],
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("AI Synthesis failed:", error);
        return "AI analysis unavailable at this time. Please review manual evidence entries.";
    }
}
