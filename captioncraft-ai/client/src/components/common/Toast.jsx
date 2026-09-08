import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const typeConfig = {
    success: {
      bg: 'bg-emerald-950/90 border-emerald-800 text-emerald-400',
      icon: <CheckCircle2 size={16} />
    },
    error: {
      bg: 'bg-red-950/90 border-red-900 text-red-400',
      icon: <AlertTriangle size={16} />
    },
    info: {
      bg: 'bg-slate-900/90 border-slate-800 text-slate-300',
      icon: <CheckCircle2 size={16} className="text-primary-400" />
    }
  }[type] || {
    bg: 'bg-slate-900/90 border-slate-850 text-slate-300',
    icon: <CheckCircle2 size={16} />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl ${typeConfig.bg}`}
    >
      {typeConfig.icon}
      <span className="text-xs font-semibold">{message}</span>
      <button 
        onClick={onClose}
        className="text-slate-400 hover:text-white transition-colors ml-2"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
};

export default Toast;
