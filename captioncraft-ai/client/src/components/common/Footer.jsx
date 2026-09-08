import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative radial glows */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* Brand Column */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2 group w-max">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles size={20} />
            </div>
            <span className="font-heading font-bold text-xl text-white tracking-tight">
              Content<span className="text-primary-500">Forge</span>
            </span>
          </Link>
          <p className="text-sm text-slate-500 leading-relaxed">
            The premium AI-powered platform for creators, influencers, and brands to architect viral copy, visual directions, and templates instantly.
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/Hexecutionerr" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/hasnain-khan-0ab3b2320" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-primary-400 transition-colors p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation - Product */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-6 uppercase tracking-wider text-xs">Product</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/tools" className="hover:text-white transition-colors">AI Tools Feed</Link></li>
            <li><Link to="/templates" className="hover:text-white transition-colors">Templates Hub</Link></li>
            <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
            <li><Link to="/chat" className="hover:text-white transition-colors">AI Chatbot</Link></li>
          </ul>
        </div>

        {/* Navigation - Resources */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-6 uppercase tracking-wider text-xs">Resources</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog & Guides</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">Creator Playbooks</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Status Dashboard</a></li>
          </ul>
        </div>

        {/* Newsletter / Signup */}
        <div className="space-y-6">
          <div>
            <h4 className="font-heading font-semibold text-white mb-2 uppercase tracking-wider text-xs">Stay Inspired</h4>
            <p className="text-sm text-slate-500">Subscribe for copywriting guides and prompts.</p>
          </div>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="name@email.com" 
              className="bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-primary-500 w-full"
            />
            <button className="bg-primary-600 hover:bg-primary-500 text-white rounded-xl px-4 py-2.5 font-medium text-sm transition-all shadow-md shadow-primary-500/25">
              <Mail size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-900 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-600 gap-4">
        <p>© 2026 ContentForge AI. All rights reserved.</p>
        <p>Architected by <a href="https://github.com/Hexecutionerr" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors font-medium">Hasnain Khan</a></p>
      </div>
    </footer>
  );
};

export default Footer;
