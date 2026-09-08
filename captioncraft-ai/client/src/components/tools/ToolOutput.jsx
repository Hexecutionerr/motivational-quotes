import React from 'react';
import OutputActions from './OutputActions';
import LoadingSkeleton from './LoadingSkeleton';
import { Eye, AlertTriangle, RefreshCw } from 'lucide-react';

const ToolOutput = ({ text, isLoading, onClear, error, onRetry, isStarred, onToggleStar }) => {
  return (
    <div className="glass-card p-6 flex flex-col h-full justify-between min-h-[350px] relative overflow-hidden">
      <div className="absolute -top-10 -left-10 w-24 h-24 bg-gradient-to-br from-accent-500/5 to-primary-500/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex-grow space-y-4">
        <div className="flex justify-between items-center border-b border-slate-900 pb-3">
          <h4 className="font-heading font-bold text-sm text-slate-400 uppercase tracking-widest">Generated Output</h4>
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <Eye size={12} /> Live Preview
          </span>
        </div>

        <div className="pt-2 text-left">
          {isLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-red-400 gap-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-red-950/40 border border-red-900/50 flex items-center justify-center text-red-400 animate-bounce">
                <AlertTriangle size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white">Generation Failed</p>
                <p className="text-xs text-slate-500 max-w-xs">{error}</p>
              </div>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="btn-primary !h-10 !px-6 text-xs font-bold flex items-center gap-1.5 active:scale-95 shadow-md shadow-primary-500/10 cursor-pointer"
                >
                  <RefreshCw size={12} /> Retry Generation
                </button>
              )}
            </div>
          ) : text ? (
            <div className="font-sans text-sm md:text-base leading-relaxed text-slate-100 whitespace-pre-wrap select-all selection:bg-primary-950 selection:text-primary-400">
              {text}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-slate-600 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-900 flex items-center justify-center">
                <Eye size={20} className="text-slate-500" />
              </div>
              <p className="text-sm font-medium">Your generated content will appear here.</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 border-t border-slate-900 pt-4">
        <OutputActions 
          text={text} 
          onClear={onClear} 
          onCopy={onCopy} 
          isStarred={isStarred} 
          onToggleStar={onToggleStar} 
        />
      </div>
    </div>
  );
};

export default ToolOutput;
