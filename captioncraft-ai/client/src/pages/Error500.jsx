import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import SEO from '../components/common/SEO';

const Error500 = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="w-full py-24 text-center space-y-6 flex flex-col items-center justify-center min-h-[70vh]">
      <SEO title="500 - Internal Server Error" description="An internal server error occurred on ContentForge AI." />

      <div className="inline-flex w-20 h-20 bg-amber-950/40 border border-amber-900/50 rounded-3xl items-center justify-center text-amber-500 mb-2 shadow-xl shadow-amber-950/20">
        <AlertTriangle size={36} className="animate-bounce" />
      </div>

      <div className="space-y-2">
        <h2 className="text-4xl font-black text-white tracking-tight">System Error</h2>
        <p className="text-slate-400 max-w-sm mx-auto text-sm leading-relaxed">
          Our servers encountered an unexpected issue. We are already looking into it. Please try reloading.
        </p>
      </div>

      <div className="pt-4">
        <button 
          onClick={handleReload}
          className="btn-primary inline-flex items-center gap-2 text-xs font-bold shadow-lg shadow-primary-500/10 active:scale-95 cursor-pointer"
        >
          <RotateCcw size={14} /> Reload Page
        </button>
      </div>
    </div>
  );
};

export default Error500;
