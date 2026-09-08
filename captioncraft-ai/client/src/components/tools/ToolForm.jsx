import React from 'react';
import { Send, Settings } from 'lucide-react';

const ToolForm = ({ 
  value, 
  onChange, 
  onGenerate, 
  isLoading, 
  placeholder, 
  settings = [], 
  settingsState = {}, 
  setSettingsState,
  maxLength = 1000
}) => {

  const handleSettingChange = (name, val) => {
    setSettingsState(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onGenerate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      {/* Settings Grid */}
      {settings.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
            <Settings size={12} /> Custom Options
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {settings.map((set) => (
              <div key={set.name} className="space-y-1">
                <label className="text-xs text-slate-500 font-medium pl-0.5">{set.label}</label>
                <select
                  value={settingsState[set.name] || set.options[0]}
                  onChange={(e) => handleSettingChange(set.name, e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-300 text-xs px-3 py-2.5 rounded-xl outline-none focus:border-primary-500 font-medium cursor-pointer"
                >
                  {set.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Box */}
      <div className="space-y-2">
        <div className="flex justify-between items-center px-0.5">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Prompt & Instructions</h4>
          <span className="text-[10px] font-semibold font-mono text-slate-500">
            {value.length} / {maxLength || 1000}
          </span>
        </div>
        <textarea
          value={value}
          onChange={(e) => {
            const maxVal = maxLength || 1000;
            if (e.target.value.length <= maxVal) {
              onChange(e.target.value);
            }
          }}
          placeholder={placeholder}
          className="w-full min-h-[150px] p-4 bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 rounded-2xl outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm leading-relaxed"
          disabled={isLoading}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="w-full btn-primary !py-3 text-sm font-bold shadow-xl shadow-primary-500/10 active:scale-98 disabled:opacity-50 disabled:scale-100"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Cooking content...</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <span>Generate Content</span>
            <Send size={14} />
          </div>
        )}
      </button>
    </form>
  );
};

export default ToolForm;
