import React, { useState } from 'react';
import { Copy, Check, Share2, Download, Trash2, Star } from 'lucide-react';

const OutputActions = ({ text, onClear, onCopy, isStarred, onToggleStar }) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (onCopy) onCopy();
  };

  const handleDownload = () => {
    if (!text) return;
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "generated-content.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = () => {
    if (!text) return;
    if (navigator.share) {
      navigator.share({
        title: 'Generated with ContentForge AI',
        text: text
      }).then(() => {
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }).catch(err => console.log(err));
    } else {
      // Fallback copy url
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
      alert("Sharing link copied to clipboard!");
    }
  };

  return (
    <div className="flex gap-2 flex-wrap items-center">
      <button
        onClick={handleCopy}
        disabled={!text}
        className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white transition-all disabled:opacity-50"
        title="Copy to clipboard"
      >
        {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
      </button>

      {onToggleStar && (
        <button
          onClick={onToggleStar}
          disabled={!text}
          className={`p-2.5 rounded-xl border transition-all disabled:opacity-50 cursor-pointer ${
            isStarred
              ? 'bg-amber-950/40 border-amber-900/50 text-amber-400 hover:bg-amber-900/40'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
          title={isStarred ? "Remove from favorites" : "Add to favorites"}
        >
          <Star size={16} fill={isStarred ? "currentColor" : "none"} />
        </button>
      )}

      <button
        onClick={handleShare}
        disabled={!text}
        className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white transition-all disabled:opacity-50"
        title="Share"
      >
        <Share2 size={16} />
      </button>

      <button
        onClick={handleDownload}
        disabled={!text}
        className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white transition-all disabled:opacity-50"
        title="Download TXT"
      >
        <Download size={16} />
      </button>

      <button
        onClick={onClear}
        disabled={!text}
        className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:bg-red-950/40 hover:text-red-400 hover:border-red-900/50 transition-all ml-auto disabled:opacity-50"
        title="Clear output"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default OutputActions;
