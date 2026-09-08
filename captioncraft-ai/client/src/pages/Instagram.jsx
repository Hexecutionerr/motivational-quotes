import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Copy, Heart, Sparkles, Share2, Check } from 'lucide-react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Dummy Instagram data
const instagramCaptions = [
  {
    id: 1,
    text: "Living my best life ✨",
    textHindi: "अपनी सबसे अच्छी ज़िंदगी जी रही हूँ ✨",
    category: "Attitude",
    likes: 890,
  },
  {
    id: 2,
    text: "Less perfection, more authenticity. 🌸",
    category: "Motivation",
    likes: 1205,
  },
  {
    id: 3,
    text: "Coffee in one hand, confidence in the other. ☕💅",
    category: "General",
    likes: 342,
  },
  {
    id: 4,
    text: "Chasing sunsets and good vibes. 🌅",
    textHindi: "सूर्यास्त और अच्छी वाइब्स का पीछा करते हुए। 🌅",
    category: "Travel",
    likes: 567,
  },
  {
    id: 5,
    text: "Sweat now, shine later. 💪",
    category: "Gym",
    likes: 908,
  }
];

const InstagramCard = ({ caption, index, onSave }) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('saved_quotes') || '[]');
    setLiked(saved.some(s => s.text === caption.text));
  }, [caption.text]);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(caption.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    const newLiked = !liked;
    setLiked(newLiked);
    onSave(caption, newLiked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="masonry-item glass-card p-6 overflow-hidden relative group cursor-pointer border-pink-100"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-pink-300/30 to-purple-300/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-100 text-xs font-medium text-pink-600 shadow-sm">
          <Camera size={14} />
          Instagram
        </span>
        <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-md">
          {caption.category}
        </span>
      </div>

      <div className="space-y-4 mb-6 relative z-10">
        <p className="font-sans font-medium text-lg text-gray-800">
          {caption.text}
        </p>
        
        {caption.textHindi && (
          <p className="font-hindi text-lg text-gray-600">
            {caption.textHindi}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4 relative z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLike}
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium transition-all duration-300 hover:scale-110",
              liked ? "text-red-500" : "text-gray-400 hover:text-red-500"
            )}
          >
            <Heart size={20} fill={liked ? "currentColor" : "none"} className={liked ? "animate-pulse" : ""} />
            <span>{liked ? caption.likes + 1 : caption.likes}</span>
          </button>
        </div>

        <button 
          onClick={handleCopy}
          className={cn(
            "p-2.5 rounded-xl transition-all duration-300",
            copied 
              ? "bg-green-50 text-green-600" 
              : "bg-gray-50 text-gray-600 hover:bg-pink-50 hover:text-pink-600"
          )}
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>
    </motion.div>
  );
};

const Instagram = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [captions, setCaptions] = useState(instagramCaptions);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const res = await fetch('http://localhost:5000/api/generate/caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood: prompt, platform: 'Instagram', count: 3 })
      });
      const data = await res.json();
      if (data.success) {
        const newCaps = data.data.map((item, i) => ({
          id: Date.now() + i,
          text: item.text || item.caption || item,
          category: "AI Generated",
          likes: 0
        }));
        setCaptions(prev => [...newCaps, ...prev]);
        setPrompt('');
      }
    } catch (err) {
      console.error(err);
      alert('Generation failed. Make sure server is running.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = (cap, isLiked) => {
    let saved = JSON.parse(localStorage.getItem('saved_quotes') || '[]');
    if (isLiked) {
      if (!saved.some(s => s.text === cap.text)) {
        saved.push({ ...cap, id: cap.id || Date.now() });
      }
    } else {
      saved = saved.filter(s => s.text !== cap.text);
    }
    localStorage.setItem('saved_quotes', JSON.stringify(saved));
  };

  return (
    <div className="w-full pb-20">
      <section className="mb-16 text-center pt-8 md:pt-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 rounded-[2rem] flex items-center justify-center text-white mb-8 shadow-2xl shadow-pink-500/30 rotate-6 hover:rotate-0 transition-transform duration-500">
            <Camera size={40} />
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-gray-900">
            Insta<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Magic</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-medium">
            Elevate your grid with AI-crafted captions that stop the scroll.
          </p>
          
          <div className="max-w-xl mx-auto flex gap-3 bg-white p-2 rounded-2xl shadow-xl border border-pink-50 focus-within:ring-2 focus-within:ring-pink-200 transition-all">
             <input 
               type="text" 
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
               placeholder="What's the photo about?"
               className="flex-grow bg-transparent border-none outline-none px-4 font-medium"
               disabled={isGenerating}
             />
             <button 
               onClick={handleGenerate}
               disabled={isGenerating}
               className="btn-primary !rounded-xl !bg-gradient-to-r from-pink-500 to-purple-600 shadow-pink-500/20"
             >
               {isGenerating ? (
                 <Sparkles size={18} className="animate-spin" />
               ) : (
                 <Sparkles size={18} />
               )}
               {isGenerating ? 'Vibing...' : 'Generate'}
             </button>
          </div>
        </motion.div>
      </section>

      <section className="masonry-grid mt-10">
        <AnimatePresence mode="popLayout">
          {captions.map((caption, idx) => (
            <InstagramCard 
              key={caption.id} 
              caption={caption} 
              index={idx} 
              onSave={handleSave}
            />
          ))}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Instagram;
