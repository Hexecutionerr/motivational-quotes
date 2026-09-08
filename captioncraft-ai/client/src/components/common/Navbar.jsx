import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Heart, Menu, X, MessageSquare, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('contentforge_theme') || 'dark');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('contentforge_theme', theme);
  }, [theme]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'AI Tools', path: '/tools' },
    { name: 'Templates', path: '/templates' },
    { name: 'Blog', path: '/blog' },
    { name: 'Pricing', path: '/pricing' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-950/80 backdrop-blur-md shadow-lg border-b border-slate-900/60' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles size={20} />
            </div>
            <span className="font-heading font-bold text-xl sm:text-2xl text-white tracking-tight">
              Content<span className="text-primary-500">Forge</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold transition-all duration-200 hover:text-primary-400 ${
                  location.pathname === link.path ? 'text-primary-400 border-b-2 border-primary-500 pb-1 mt-0.5' : 'text-slate-300 hover:scale-102'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
             <Link to="/saved" className="text-slate-400 hover:text-primary-400 transition-colors p-2 flex items-center gap-1 text-sm font-medium">
               <Heart size={18} />
               <span className="hidden lg:inline text-xs">Saved</span>
             </Link>
             
             <Link to="/chat" className="text-slate-400 hover:text-primary-400 transition-colors p-2 relative group mr-2">
               <MessageSquare size={18} />
               <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
               </span>
             </Link>

             <button
               onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
               className="p-2 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white transition-colors cursor-pointer mr-1"
               aria-label="Toggle Theme"
             >
               {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
             </button>

             <Link to="/login" className="btn-primary !px-5 !py-2 text-xs font-bold whitespace-nowrap shadow-md shadow-primary-500/15">
                Sign In
             </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-slate-300 hover:text-primary-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950 border-b border-slate-900 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6 shadow-inner text-left">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-3 rounded-xl text-base font-bold ${
                    location.pathname === link.path 
                      ? 'bg-slate-900 text-primary-400' 
                      : 'text-slate-300 hover:bg-slate-900/60'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-slate-900 grid grid-cols-2 gap-4">
                <Link to="/saved" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-slate-900 text-slate-300 hover:bg-slate-800 text-sm font-semibold">
                   <Heart size={18} />
                   Saved
                </Link>
                <Link to="/chat" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-slate-900 text-slate-300 hover:bg-slate-800 relative text-sm font-semibold">
                   <MessageSquare size={18} />
                   Chat AI
                   <span className="absolute top-2 right-2 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                   </span>
                </Link>
              </div>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="px-4 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 flex items-center justify-center cursor-pointer"
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex-grow btn-primary py-3 text-center text-sm font-bold">
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
