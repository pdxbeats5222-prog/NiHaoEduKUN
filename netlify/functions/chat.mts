import type { Context } from '@netlify/functions'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({})

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return new Response('Invalid JSON body', { status: 400 });
  }
  const { message, history } = body;

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
      ...(history || []).map((msg: any) => ({
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
    
    return Response.json({ text: response.text || "I'm sorry, I couldn't generate a response." });
  } catch (error) {
    console.error("Error in AI Gateway function:", error);
    return new Response(JSON.stringify({ error: "Failed to generate response" }), { status: 500 });
  }
}

export const config = {
  path: '/api/chat',
}
