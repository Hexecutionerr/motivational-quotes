import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import SEO from '../components/common/SEO';

const Offline = () => {
  const checkStatus = () => {
    if (navigator.onLine) {
      window.location.href = '/';
    } else {
      alert("Still offline. Please check your internet connection.");
    }
  };

  return (
    <div className="w-full py-24 text-center space-y-6 flex flex-col items-center justify-center min-h-[70vh]">
      <SEO title="Offline - ContentForge AI" description="You are currently offline. Please reconnect to use ContentForge AI." />

      <div className="inline-flex w-20 h-20 bg-slate-900 border border-slate-800 rounded-3xl items-center justify-center text-slate-500 mb-2 shadow-xl">
        <WifiOff size={36} className="animate-pulse" />
      </div>

      <div className="space-y-2">
        <h2 className="text-4xl font-black text-white tracking-tight">You are Offline</h2>
        <p className="text-slate-400 max-w-sm mx-auto text-sm leading-relaxed">
          Please check your network cables or Wi-Fi connection. AI services require an active internet connection.
        </p>
      </div>

      <div className="pt-4">
        <button 
          onClick={checkStatus}
          className="btn-primary inline-flex items-center gap-2 text-xs font-bold shadow-lg shadow-primary-500/10 active:scale-95 cursor-pointer"
        >
          <RefreshCw size={14} /> Try Reconnecting
        </button>
      </div>
    </div>
  );
};

export default Offline;
