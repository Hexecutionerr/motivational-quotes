import React, { useState, useEffect } from 'react';
import { toolsConfig } from '../config/tools.config';
import ToolCard, { ToolIcon } from '../components/tools/ToolCard';
import SearchBar from '../components/tools/SearchBar';
import CategoryFilter from '../components/tools/CategoryFilter';
import SEO from '../components/common/SEO';
import { storage } from '../services/storage';
import { analytics } from '../services/analytics';
import { Sparkles, History, Flame, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

const ToolsHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [recentlyUsed, setRecentlyUsed] = useState([]);

  const categories = ['All', 'Social', 'Writing', 'Business', 'SEO'];

  // Track page view and load history on mount
  useEffect(() => {
    analytics.trackPageView('/tools');
    
    // Load recently used tools from storage
    const lastUsedSlugs = storage.getLastUsedTools();
    if (lastUsedSlugs && lastUsedSlugs.length > 0) {
      const mapped = lastUsedSlugs.map(slug => toolsConfig.find(t => t.slug === slug)).filter(Boolean);
      setRecentlyUsed(mapped);
    } else {
      // Fallback presets if empty
      setRecentlyUsed([
        toolsConfig.find(t => t.slug === 'ai-caption-generator'),
        toolsConfig.find(t => t.slug === 'hook-generator'),
        toolsConfig.find(t => t.slug === 'youtube-title-generator')
      ].filter(Boolean));
    }
  }, []);

  // Popular Tools
  const popularTools = [
    toolsConfig.find(t => t.slug === 'linkedin-post-generator'),
    toolsConfig.find(t => t.slug === 'ai-rewrite-tool'),
    toolsConfig.find(t => t.slug === 'email-writer')
  ].filter(Boolean);

  // Filter tools
  const filteredTools = toolsConfig.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full pb-20 pt-4 text-left relative">
      <SEO 
        title="AI Copywriting Tools Hub" 
        description="Explore our library of 15+ copywriting, SEO, and social media AI tools powered by Gemini."
      />

      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <section className="mb-16 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 border-b border-slate-900 pb-10">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-950/40 text-primary-400 font-semibold text-xs border border-primary-900/50 uppercase tracking-wider">
            <Sparkles size={12} className="animate-pulse" />
            AI Creator Studio
          </span>
          <h2 className="text-4xl font-black text-white tracking-tight">AI Writing & SEO Tools</h2>
          <p className="text-slate-400 max-w-xl text-sm md:text-base leading-relaxed">
            Select a specialized writing formula or content template below to generate professional copywriting.
          </p>
        </div>
        
        {/* Search Bar */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </section>

      {/* RECENTLY USED SECTION (only show if no active query) */}
      {!searchQuery && activeCategory === 'All' && recentlyUsed.length > 0 && (
        <section className="mb-16">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6">
            <History size={14} className="text-slate-500" /> Recently Used Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recentlyUsed.map((tool) => (
              <Link
                key={tool.id}
                to={`/tool/${tool.slug}`}
                className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 transition-all hover:bg-slate-900 hover:border-primary-500/20 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <ToolIcon name={tool.icon} className="text-primary-400" size={18} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-white group-hover:text-primary-400 transition-colors">{tool.title}</h4>
                  <span className="text-[10px] text-slate-500 font-medium">{tool.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Category Tabs & Tool List */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <LayoutGrid size={14} className="text-slate-500" /> Explore Tools Catalog
          </h3>
          
          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/10 border border-dashed border-slate-900 rounded-3xl">
            <p className="text-sm text-slate-500 font-medium">No tools found matching your filters.</p>
          </div>
        )}
      </section>

      {/* POPULAR TOOLS SECTION */}
      {!searchQuery && activeCategory === 'All' && (
        <section className="mt-20 border-t border-slate-900 pt-16">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-8">
            <Flame size={14} className="text-amber-500 animate-pulse" /> Popular Copywriting Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ToolsHub;
