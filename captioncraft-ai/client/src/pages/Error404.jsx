import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';
import SEO from '../components/common/SEO';

const Error404 = () => {
  return (
    <div className="w-full py-24 text-center space-y-6 flex flex-col items-center justify-center min-h-[70vh]">
      <SEO title="404 - Page Not Found" description="The page you are looking for does not exist on ContentForge AI." />
      
      <div className="inline-flex w-20 h-20 bg-red-950/40 border border-red-900/50 rounded-3xl items-center justify-center text-red-500 mb-2 shadow-xl shadow-red-950/20">
        <AlertCircle size={36} className="animate-pulse" />
      </div>

      <div className="space-y-2">
        <h2 className="text-4xl font-black text-white tracking-tight">Page Not Found</h2>
        <p className="text-slate-400 max-w-sm mx-auto text-sm leading-relaxed">
          The page you are looking for doesn't exist, has been removed, or the link is broken.
        </p>
      </div>

      <div className="pt-4">
        <Link 
          to="/" 
          className="btn-primary inline-flex items-center gap-2 text-xs font-bold shadow-lg shadow-primary-500/10 active:scale-95"
        >
          <Home size={14} /> Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error404;
