import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Sparkles, User, Bot, Trash2, BrainCircuit } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', content: "Hey! I'm your AI content assistant. 🌸\n\nI can help you mix/match captions, brainstorm hashtags, or just chat about social media strategies. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/generate/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: [] })
      });
      const data = await res.json();
      
      if (data.success) {
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', content: data.data.response }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', content: "Oops! I'm having trouble connecting to my brain right now. Please check if the backend is running! 🧠🔌" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ id: 1, role: 'bot', content: "Chat cleared! Ready for something new? ✨" }]);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 h-[calc(100vh-140px)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary-500 flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
             <BrainCircuit size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-none">AI Chat Assistant</h1>
            <p className="text-sm text-green-500 font-medium flex items-center gap-1.5 mt-1">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
               Always active
            </p>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="p-2.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="flex-grow glass-card mb-4 overflow-hidden flex flex-col border-primary-50">
        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-200"
        >
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm ${
                    msg.role === 'user' ? 'bg-gray-900 text-white' : 'bg-primary-100 text-primary-600'
                  }`}>
                    {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                  </div>
                  <div className={`rounded-2xl p-4 shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary-600 text-white rounded-tr-none' 
                      : 'bg-white border border-gray-100 rounded-tl-none text-gray-800'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                      {msg.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                    <Sparkles size={18} className="animate-spin" />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-4 shadow-sm flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-4 bg-gray-50/50 border-t border-gray-100">
           <div className="relative">
             <textarea 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => {
                 if(e.key === 'Enter' && !e.shiftKey) {
                   e.preventDefault();
                   handleSend();
                 }
               }}
               placeholder="Type your message..."
               className="w-full bg-white border border-gray-200 rounded-2xl pl-5 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-primary-200/50 focus:border-primary-400 transition-all resize-none shadow-sm h-14"
               rows="1"
             />
             <button 
               onClick={handleSend}
               disabled={!input.trim() || isLoading}
               className="absolute right-2 top-2 bottom-2 bg-primary-600 text-white rounded-xl px-4 hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
             >
               <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
             </button>
           </div>
           <p className="text-[10px] text-center text-gray-400 mt-2 font-medium uppercase tracking-widest">
              Powered by CaptionCraft Intelligence
           </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
