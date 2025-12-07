import Groq from "groq-sdk";

export async function callGroq(prompt) {
    try {
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            console.error("❌ Groq API key is missing in .env");
            return "API key missing";
        }

        console.log("🔵 Sending to Groq:", prompt);

        const groq = new Groq({ apiKey });

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "give reply in only three lines",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 1024,
        });

        const reply = chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't process that";

        console.log("🟣 Groq Response:", reply);

        return reply;
    } catch (err) {
        console.error("❌ GROQ API ERROR:", err);
        return "I'm having trouble responding right now.";
    }
}
