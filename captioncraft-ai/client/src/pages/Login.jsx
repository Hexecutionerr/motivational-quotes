import React, { useState } from 'react';
import { Sparkles, Mail, Lock, User, ArrowRight } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Authentication forms are mocked for design. Connect to backend auth controller endpoints.");
  };

  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center pt-8 pb-16 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full glass-card border border-slate-800 p-8 space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 items-center justify-center text-white shadow-md shadow-primary-500/20 mb-2">
            <Sparkles size={24} />
          </div>
          <h3 className="font-heading font-bold text-2xl text-white">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h3>
          <p className="text-xs text-slate-500">
            {isLogin ? "Log in to ContentForge AI to write your copy." : "Get started with 10 free generations per month."}
          </p>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            type="button" 
            onClick={() => alert("Google Auth mocked.")}
            className="flex items-center justify-center gap-2 py-2.5 border border-slate-800 rounded-xl bg-slate-900 text-xs font-semibold text-slate-300 hover:bg-slate-850 transition-all hover:text-white"
          >
            <span className="text-red-500 font-bold">G</span> Google
          </button>
          <button 
            type="button"
            onClick={() => alert("GitHub Auth mocked.")}
            className="flex items-center justify-center gap-2 py-2.5 border border-slate-800 rounded-xl bg-slate-900 text-xs font-semibold text-slate-300 hover:bg-slate-850 transition-all hover:text-white"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg> GitHub
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute w-full border-t border-slate-900"></div>
          <span className="relative bg-slate-950 px-3 text-[10px] uppercase font-bold text-slate-600 tracking-widest">Or Continue with</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1 text-left">
              <label className="text-xs text-slate-500 pl-1">Full Name</label>
              <div className="relative flex items-center">
                <div className="absolute pl-3 text-slate-500"><User size={16} /></div>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Hasnain Khan" 
                  className="input-field pl-10 text-sm" 
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1 text-left">
            <label className="text-xs text-slate-500 pl-1">Email Address</label>
            <div className="relative flex items-center">
              <div className="absolute pl-3 text-slate-500"><Mail size={16} /></div>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="name@email.com" 
                className="input-field pl-10 text-sm" 
                required
              />
            </div>
          </div>

          <div className="space-y-1 text-left">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs text-slate-500">Password</label>
              {isLogin && <a href="#" className="text-[10px] font-semibold text-primary-400 hover:underline">Forgot?</a>}
            </div>
            <div className="relative flex items-center">
              <div className="absolute pl-3 text-slate-500"><Lock size={16} /></div>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                className="input-field pl-10 text-sm" 
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full btn-primary !py-3 font-bold text-sm shadow-lg shadow-primary-500/25 mt-6"
          >
            {isLogin ? "Sign In" : "Sign Up"}
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Toggle Footer */}
        <div className="text-center pt-2 text-xs text-slate-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-primary-400 font-bold pl-1.5 hover:underline"
          >
            {isLogin ? "Create one free" : "Log in here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
