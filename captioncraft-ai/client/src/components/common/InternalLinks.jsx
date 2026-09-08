import React from 'react';
import { Link } from 'react-router-dom';
import { toolsConfig } from '../../config/tools.config';
import { seoCategories, toolSeoMapping } from '../../config/seoData.config';
import { Link2, Sparkles, Compass, Flame } from 'lucide-react';

const InternalLinks = ({ toolConfig, categorySlug, topicSlug }) => {
  if (!toolConfig) return null;

  // 1. Get other categories mapped to this tool
  const allowedCatKeys = toolSeoMapping[toolConfig.slug] || [];
  const relatedCategories = allowedCatKeys
    .filter(catKey => catKey !== categorySlug && seoCategories[catKey])
    .map(catKey => ({
      label: seoCategories[catKey].name,
      path: `/tools/${toolConfig.slug}/${catKey}`
    }));

  // 2. Get topics in current category
  let popularTopics = [];
  if (categorySlug && seoCategories[categorySlug]) {
    const topicsMap = seoCategories[categorySlug].topics;
    popularTopics = Object.entries(topicsMap)
      .filter(([topicKey]) => topicKey !== topicSlug)
      .map(([topicKey, topicName]) => ({
        label: topicName,
        path: `/tools/${toolConfig.slug}/${categorySlug}/${topicKey}`
      }));
  }

  // 3. Get related tools in same category
  const relatedTools = toolsConfig
    .filter(t => t.slug !== toolConfig.slug && t.category === toolConfig.category)
    .slice(0, 4)
    .map(t => ({
      label: t.title,
      path: `/tools/${t.slug}`
    }));

  // 4. Trending Searches (Dummy SEO keywords for internal linking)
  const trendingSearches = [
    { label: "Viral Instagram Gym Quotes", path: "/tools/ai-quote-generator/fitness/gym" },
    { label: "Savage Instagram Selfie Captions", path: "/tools/ai-caption-generator/selfie/savage" },
    { label: "Tech Startup LinkedIn Hooks", path: "/tools/linkedin-post-generator/business/startups" },
    { label: "Travel Vlog YouTube Titles", path: "/tools/youtube-title-generator/travel/vlog" }
  ];

  return (
    <div className="mt-20 border-t border-slate-900 pt-16 space-y-12 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Related Categories */}
        {relatedCategories.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Compass size={14} className="text-primary-400" /> Related Categories
            </h4>
            <div className="flex flex-wrap gap-2">
              {relatedCategories.map(cat => (
                <Link
                  key={cat.path}
                  to={cat.path}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-primary-500/30 text-xs font-bold text-slate-300 hover:text-white transition-all"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Popular Topics */}
        {popularTopics.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Flame size={14} className="text-amber-500" /> Popular {seoCategories[categorySlug]?.name} Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {popularTopics.map(topic => (
                <Link
                  key={topic.path}
                  to={topic.path}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-primary-500/30 text-xs font-bold text-slate-300 hover:text-white transition-all"
                >
                  {topic.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles size={14} className="text-primary-400" /> Related {toolConfig.category} Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {relatedTools.map(tool => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-primary-500/30 text-xs font-bold text-slate-300 hover:text-white transition-all"
                >
                  {tool.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trending Searches Row */}
      <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl space-y-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <Link2 size={14} className="text-primary-400" /> Trending AI Generators
        </h4>
        <div className="flex flex-wrap gap-3">
          {trendingSearches.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className="text-xs font-semibold text-slate-400 hover:text-primary-400 transition-colors flex items-center gap-1"
            >
              <span>#</span> {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InternalLinks;
