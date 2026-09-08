import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

const ToolIcon = ({ name, className, size = 20 }) => {
  const Icon = Icons[name] || Icons.Sparkles;
  return <Icon className={className} size={size} />;
};

const ToolCard = ({ tool }) => {
  return (
    <Link 
      to={`/tool/${tool.slug}`}
      className="glass-card p-6 flex flex-col justify-between text-left group relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-500/20 hover:bg-slate-900/80"
    >
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800 group-hover:scale-105 transition-transform duration-300">
            <ToolIcon name={tool.icon} className="text-primary-400" size={22} />
          </div>
          <span className="text-[10px] font-semibold text-primary-400 bg-primary-950/40 border border-primary-900/50 px-2.5 py-1 rounded-md">
            {tool.category}
          </span>
        </div>

        <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-primary-400 transition-colors">
          {tool.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          {tool.description}
        </p>
      </div>

      <div className="border-t border-slate-900 pt-4 flex justify-between items-center text-xs font-semibold text-primary-400 group-hover:text-primary-300 transition-colors">
        <span>Open Tool</span>
        <Icons.ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
};

export default ToolCard;
export { ToolIcon };
