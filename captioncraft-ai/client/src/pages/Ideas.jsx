import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Sparkles, Copy, Check, Send, Layout, Image, Hash } from 'lucide-react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const PostIdeas = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const res = await fetch('http://localhost:5000/api/generate/post-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood: prompt, platform: 'Instagram', category: 'Creative' })
      });
      const data = await res.json();
      if (data.success) {
        setIdeas(data.data.map((item, i) => ({
          id: Date.now() + i,
          concept: item.concept || item.text || item,
          caption: item.caption || "Check this amazing idea!",
          hashtags: item.hashtags || ["#creative", "#ideas", "#trending"]
        })));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to generate ideas. Please make sure backend is running.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-orange-500/20 rotate-3">
          <Lightbulb size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 !leading-tight text-gray-900">
           Creative <span className="text-orange-500">Post Ideas</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Not sure what to post? Let our AI strategist brainstorm viral concepts, captions, and tags for you.
        </p>
      </motion.div>

      <div className="glass-card p-6 md:p-8 mb-12 relative group overflow-hidden border-orange-100">
         <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 blur-3xl opacity-20 -mr-10 -mt-10"></div>
         <div className="relative z-10 flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="e.g., Summer travel vlog, coffee shop aesthetic, crypto education..." 
              className="input-field border-orange-100 focus:ring-orange-200 focus:border-orange-300 py-4"
              disabled={isGenerating}
            />
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="btn-primary bg-gradient-to-r from-orange-500 to-yellow-500 px-8 whitespace-nowrap disabled:opacity-50"
            >
              <Sparkles size={20} className={isGenerating ? "animate-spin" : ""} />
              {isGenerating ? 'Brainstorming...' : 'Generate Ideas'}
            </button>
         </div>
      </div>

      <div className="space-y-8">
        <AnimatePresence mode="popLayout">
          {ideas.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 border-l-4 border-orange-400 group hover:shadow-xl transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-orange-500 uppercase tracking-wider mb-2">
                       <Layout size={14} /> Concept
                    </label>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">
                      {idea.concept}
                    </h3>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-wider mb-2">
                       <Sparkles size={14} /> Suggested Caption
                    </label>
                    <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 relative group/caption">
                      <p className="text-gray-700 leading-relaxed italic">
                        "{idea.caption}"
                      </p>
                      <button 
                        onClick={() => handleCopy(idea.caption, `caption-${idea.id}`)}
                        className="absolute top-2 right-2 p-2 rounded-lg bg-white shadow-sm opacity-0 group-hover/caption:opacity-100 transition-opacity"
                      >
                        {copiedId === `caption-${idea.id}` ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {idea.hashtags.map((tag, i) => (
                      <span key={i} className="text-sm text-primary-600 font-medium">
                        {tag.startsWith('#') ? tag : `#${tag}`}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:w-64 flex flex-col gap-3">
                  <div className="bg-gradient-to-br from-gray-50 to-orange-50/30 rounded-2xl p-4 border border-gray-100 h-full flex flex-col justify-center items-center text-center group-hover:bg-white transition-colors">
                     <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-3 group-hover:scale-110 transition-transform">
                        <Image size={24} />
                     </div>
                     <span className="text-sm font-bold text-gray-900 mb-1">Visual Direction</span>
                     <p className="text-xs text-gray-500 line-clamp-3">Aesthetic close-up shots with warm lighting and minimalist vibes.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {ideas.length === 0 && !isGenerating && (
          <div className="text-center py-20 opacity-40">
            <Send size={48} className="mx-auto mb-4" />
            <p className="text-lg">Type a niche above to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostIdeas;
