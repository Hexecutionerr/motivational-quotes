import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

const ToolLayout = ({ title, description, category, children }) => {
  return (
    <div className="w-full pb-20 pt-4 text-left relative">
      {/* Back button */}
      <div className="mb-6">
        <Link 
          to="/tools" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Back to AI Tools
        </Link>
      </div>

      {/* Header Info */}
      <section className="mb-12 space-y-4">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-950/40 text-primary-400 font-semibold text-xs border border-primary-900/50 uppercase tracking-wider">
          <Sparkles size={10} className="animate-pulse" />
          {category} Tool
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-white">{title}</h2>
        <p className="text-slate-400 max-w-3xl text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </section>

      {/* Children Layout (Forms & Outputs Grid) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {children}
      </section>
    </div>
  );
};

export default ToolLayout;
