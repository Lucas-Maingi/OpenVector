process.loadEnvFile('.env.local');
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGemini() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("No API key in .env.local");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "You are an elite cybersecurity OSINT analyst. Synthesize this data."
    });

    const prompt = `Analyze the following findings for x.com:\n\n- HackerTarget DNS: Found 12 DNS records.`;

    console.log("Sending to Gemini...");
    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    console.log("RESPONSE:", result.response.text());
}

testGemini().catch(console.error);
