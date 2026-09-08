import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, Copy, Check, Share2, Search, Filter } from 'lucide-react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Saved = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    // Load from localStorage for quick testing
    const saved = JSON.parse(localStorage.getItem('saved_quotes') || '[]');
    setSavedItems(saved);
  }, []);

  const handleRemove = (id) => {
    const updated = savedItems.filter(item => item.id !== id);
    setSavedItems(updated);
    localStorage.setItem('saved_quotes', JSON.stringify(updated));
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredItems = savedItems.filter(item => 
    item.text?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 px-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My <span className="text-red-500">Collection</span></h1>
          <p className="text-gray-500">Your personal library of aesthetic captions and quotes.</p>
        </div>
        
        <div className="w-full md:w-96 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search your saved items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-12 shadow-inner bg-gray-50/50"
          />
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="masonry-grid px-4">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, rotate: -2 }}
                className="masonry-item glass-card p-6 border-red-50 hover:border-red-100 group"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md uppercase tracking-wider">
                    {item.category}
                  </span>
                  <button 
                    onClick={() => handleRemove(item.id)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <p className="font-quote text-2xl leading-relaxed text-gray-800 mb-6 italic">
                  "{item.text}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                   <div className="flex gap-2">
                     <button 
                       onClick={() => handleCopy(item.text, item.id)}
                       className={cn(
                         "p-2.5 rounded-xl transition-all duration-300",
                         copiedId === item.id 
                           ? "bg-green-50 text-green-600" 
                           : "bg-gray-50 text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                       )}
                     >
                       {copiedId === item.id ? <Check size={18} /> : <Copy size={18} />}
                     </button>
                     <button className="p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
                        <Share2 size={18} />
                     </button>
                   </div>
                   
                   <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      Saved on {new Date(item.id).toLocaleDateString()}
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-32 bg-gray-50/50 rounded-3xl mx-4 border-2 border-dashed border-gray-200">
           <Heart size={64} className="mx-auto text-gray-200 mb-4" />
           <h3 className="text-xl font-bold text-gray-400">Nothing saved yet!</h3>
           <p className="text-gray-400">Head back to explore and heart your favorites.</p>
        </div>
      )}
    </div>
  );
};

export default Saved;
