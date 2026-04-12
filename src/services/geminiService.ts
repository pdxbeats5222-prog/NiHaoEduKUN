import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
// The system provides process.env.GEMINI_API_KEY automatically
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function chatWithGemini(message: string, history: { role: string, text: string }[]) {
  try {
    const contents = [
      { 
        role: 'user', 
        parts: [{ text: "You are a helpful, friendly assistant for Nihao.edu, an educational consultancy helping international students study in China. Keep answers concise, encouraging, and helpful. You can help answer questions about studying in China, visas, universities, and our services." }] 
      },
      { 
        role: 'model', 
        parts: [{ text: "Understood. I am ready to help students with their journey to China!" }] 
      },
      ...history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      })),
      { 
        role: 'user', 
        parts: [{ text: message }] 
      }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents as any,
    });
    
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error chatting with Gemini:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later or contact us directly.";
  }
}
