export async function chatWithGemini(message: string, history: { role: string, text: string }[]) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error chatting with Gemini via API:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later or contact us directly.";
  }
}
