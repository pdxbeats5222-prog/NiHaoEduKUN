import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Sparkles, Cpu, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { chatWithGemini } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: 'System initialized. I am the Nihao AI Nexus. How can I assist with your transition to China?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', text: userMessage };
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    // Get chat history for context (excluding the very first greeting to save tokens, or include it)
    const history = messages.map(m => ({ role: m.role, text: m.text }));

    // Call Gemini
    const responseText = await chatWithGemini(userMessage, history);

    // Add model response
    setMessages(prev => [
      ...prev, 
      { id: (Date.now() + 1).toString(), role: 'model', text: responseText }
    ]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Instagram Button */}
      <a
        href="https://www.instagram.com/nihao_edu_kun?igsh=enZzajQxZ3A1d3F5&utm_source=qr"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-[12rem] right-6 z-50 w-14 h-14 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform hover:shadow-xl ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Follow on Instagram"
      >
        <Instagram className="w-7 h-7" />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/8615968141445"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-[7.5rem] right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform hover:shadow-xl ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Contact on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </a>

      {/* Futuristic AI Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center group ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open AI Assistant"
      >
        {/* Outer glowing blur */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-amber-500 blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
        
        {/* Spinning gradient ring */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div 
            className="absolute inset-[-50%] animate-spin bg-[conic-gradient(from_0deg,transparent_0%,#ef4444_30%,#f59e0b_50%,#ef4444_70%,transparent_100%)]" 
            style={{ animationDuration: '3s' }}
          ></div>
        </div>
        
        {/* Inner dark circle */}
        <div className="absolute inset-[2px] bg-[#1d1d1f] rounded-full z-10 flex items-center justify-center border border-white/10 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]">
          <Sparkles className="w-7 h-7 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] group-hover:scale-110 group-hover:text-amber-300 group-hover:drop-shadow-[0_0_15px_rgba(251,191,36,1)] transition-all duration-300" />
        </div>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[550px] max-h-[85vh] bg-white/70 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white/50 flex flex-col overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-500/10 to-transparent pointer-events-none"></div>

            {/* Header */}
            <div className="relative p-5 flex items-center justify-between border-b border-gray-200/50 bg-white/40 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center shadow-lg">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-[#1d1d1f] block text-lg tracking-tight">Nihao AI Nexus</span>
                  <span className="text-xs text-red-600 font-medium flex items-center gap-1 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> Online
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center text-[#5a5a5c] hover:text-[#1d1d1f] hover:bg-white transition-all shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 relative z-10 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-br from-red-600 to-red-500 text-white rounded-tr-sm shadow-[0_4px_14px_rgba(220,38,38,0.3)]' 
                        : 'bg-white/80 backdrop-blur-md border border-white/60 text-[#1d1d1f] rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/80 backdrop-blur-md border border-white/60 text-[#1d1d1f] p-4 rounded-2xl rounded-tl-sm flex items-center gap-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                    <span className="text-sm font-medium text-[#5a5a5c]">Processing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white/40 backdrop-blur-md border-t border-gray-200/50 relative z-10">
              <form onSubmit={handleSend} className="flex items-center gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Initialize query..."
                  className="flex-1 px-5 py-3.5 bg-white/70 backdrop-blur-sm border border-white/50 rounded-full text-sm focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/20 transition-all text-[#1d1d1f] shadow-inner placeholder:text-gray-400"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_4px_14px_rgba(220,38,38,0.4)] hover:scale-105 transition-all shrink-0"
                >
                  <Send className="w-5 h-5 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
