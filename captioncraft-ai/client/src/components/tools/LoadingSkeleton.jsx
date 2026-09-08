import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse py-2">
      <div className="h-4 bg-slate-800 rounded-lg w-1/3"></div>
      <div className="space-y-2">
        <div className="h-3 bg-slate-800 rounded-lg w-full"></div>
        <div className="h-3 bg-slate-800 rounded-lg w-5/6"></div>
        <div className="h-3 bg-slate-800 rounded-lg w-4/5"></div>
      </div>
      <div className="h-20 bg-slate-800/40 rounded-xl w-full border border-slate-800 mt-6"></div>
    </div>
  );
};

export default LoadingSkeleton;
