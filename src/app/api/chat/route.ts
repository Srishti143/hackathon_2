import { GoogleGenerativeAI } from "@google/generative-ai";
import { Groq } from "groq-sdk";
import { menuCategories } from "@/data/menu-booklet";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

export async function POST(req: Request) {
    const { messages } = await req.json();

    const menuContext = menuCategories.map(category => {
        const items = category.items.map(item =>
            `- ${item.name} (${item.price}): ${item.description} [Tags: ${item.tags?.join(", ")}]`
        ).join("\n");
        return `### ${category.title} (${category.tagline})\n${items}`;
    }).join("\n\n");

    const systemInstruction = `You are Charlie, the "BrewBot '78" from Retro Cafe. 
  Your personality: Friendly, nostalgic, polite, and playful. Use 70s slang occasionally (like "groovy", "far out", "jazzy").
  Your goal: Help customers explore the menu, get recommendations based on their mood or taste, and answer FAQs about the cafe.
  
  RESPONSE FORMAT RULES:
  1. Start with a SHORT, nostalgic, and friendly sentence or two (max 30 words).
  2. If recommending items, list them strictly as bullet points below the intro.
  3. Format for items: "- **Item Name** - ₹Price"
  4. End with a concise question or call to action.
  
  Our Menu:
  ${menuContext}
  
  Location: S-VYASA University School of Advance Studies, 6th Floor, Bengaluru.
  Hours: 7am - 9pm daily.
  WiFi: "Retro_Vibes" (Password: vintage1978).
  
  If you don't know something, suggest they come in and talk to our human baristas.
  Keep your responses concise and maintain the retro illusion.`;

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-flash-latest",
        });

        const rawHistory = messages.slice(0, -1);
        let startIndex = 0;

        while (startIndex < rawHistory.length && rawHistory[startIndex].role !== "user") {
            startIndex++;
        }

        const validHistory = rawHistory.slice(startIndex);

        const mappedHistory = validHistory.map((m: any) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
        }));

        const history = [
            {
                role: "user",
                parts: [{ text: systemInstruction }]
            },
            {
                role: "model",
                parts: [{ text: "Understood. I am Charlie, the BrewBot '78. I'm ready to help customers with a retro vibe!" }]
            },
            ...mappedHistory
        ];

        const lastMessage = messages[messages.length - 1].content;

        const chat = model.startChat({
            history: history,
        });

        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        const text = response.text();

        return new Response(JSON.stringify({ content: text }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("Gemini API Error details:", error.message || error);
        console.log("Gemini Key Present:", !!process.env.GEMINI_API_KEY);
        console.log("Groq Key Present:", !!process.env.GROQ_API_KEY);

        try {
            // Construct messages for Groq (OpenAI format)
            const groqMessages = [
                { role: "system", content: systemInstruction },
                ...messages
            ];

            const completion = await groq.chat.completions.create({
                messages: groqMessages,
                model: "llama-3.3-70b-versatile", // Updated to supported model
                temperature: 0.7,
                max_tokens: 500,
            });

            const text = completion.choices[0]?.message?.content || "Sorry, I'm having trouble connecting to my memory banks right now.";

            return new Response(JSON.stringify({ content: text }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });

        } catch (groqError: any) {
            console.error("Groq API Error details:", groqError.message || groqError);
            return new Response(JSON.stringify({
                content: `Whoops! The vacuum tubes are overheating. (Debug: Gemini Error: ${error.message?.substring(0, 50)}... | Groq Error: ${groqError.message?.substring(0, 50)}...)`
            }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }
    }
}
