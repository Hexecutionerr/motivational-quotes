import React from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, User } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: "Copywriting 101: The Psychology of High-Converting Hooks",
    desc: "Understand the biological triggers behind curiosity, validation, and fear of missing out, and learn how to construct thread hooks that get read.",
    author: "Hasnain Khan",
    date: "July 2, 2026",
    readTime: "5 min read",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    title: "AI Copywriting vs. Human Writers: The Future of Marketing",
    desc: "AI is moving at light speed. We explore how generative models like Gemini are redefining social copy pipelines and how marketers can adapt.",
    author: "Elena Petrova",
    date: "June 28, 2026",
    readTime: "8 min read",
    category: "AI Trends",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    title: "Instagram Algorithm Decoded: Writing Captions for Reach",
    desc: "Captions are no longer just supplementary text. Learn how contextual search SEO and watch times determine how the algorithm boosts posts.",
    author: "Marcus Aurelius",
    date: "June 15, 2026",
    readTime: "4 min read",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=250&fit=crop"
  },
  {
    id: 4,
    title: "5 Copywriting Frameworks Every Indie Founder Needs to Know",
    desc: "You have a great product, but you can't describe it. Discover how AIDA, PAS, BAB, and hook-story-offer formulas clarify your messaging.",
    author: "Hasnain Khan",
    date: "June 10, 2026",
    readTime: "6 min read",
    category: "Frameworks",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=250&fit=crop"
  }
];

const Blog = () => {
  return (
    <div className="w-full pb-20 pt-4 text-left">
      <section className="mb-16">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-950/40 text-primary-400 font-semibold text-xs mb-6 border border-primary-900/50 uppercase tracking-wider">
          <BookOpen size={12} />
          ContentForge Blog
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
          Insights on <span className="text-gradient">Copywriting & Growth</span>
        </h2>
        <p className="text-slate-400 max-w-2xl text-base md:text-lg">
          Master the art of social copywriting, scale your marketing content, and harness the potential of generative AI.
        </p>
      </section>

      {/* Featured Post */}
      <section className="mb-16">
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 items-center group">
          <div className="h-64 lg:h-full overflow-hidden relative">
            <img 
              src={posts[0].image} 
              alt={posts[0].title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute top-4 left-4 bg-slate-950/80 border border-slate-800 text-slate-200 text-xs px-3 py-1 rounded-md font-semibold">
              Featured Guide
            </div>
          </div>
          <div className="p-8 space-y-6">
            <div className="flex gap-4 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1.5"><Calendar size={12} />{posts[0].date}</span>
              <span className="flex items-center gap-1.5"><Clock size={12} />{posts[0].readTime}</span>
            </div>
            
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-white group-hover:text-primary-400 transition-colors">
              {posts[0].title}
            </h3>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              {posts[0].desc}
            </p>

            <div className="flex justify-between items-center pt-6 border-t border-slate-900">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-bold text-xs border border-slate-700">HK</div>
                <span className="text-xs text-slate-400 font-medium">{posts[0].author}</span>
              </div>
              
              <button className="text-xs font-bold text-primary-400 group-hover:text-primary-300 transition-colors flex items-center gap-1.5">
                Read Article
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.slice(1).map((post) => (
          <div key={post.id} className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between group cursor-pointer hover:border-primary-500/20 transition-all duration-300">
            <div>
              <div className="h-48 overflow-hidden relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                <span className="absolute top-3 left-3 bg-slate-950/80 border border-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded font-semibold">
                  {post.category}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-3 text-[10px] text-slate-500 font-mono">
                  <span className="flex items-center gap-1"><Calendar size={10} />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={10} />{post.readTime}</span>
                </div>
                <h4 className="font-heading font-bold text-lg text-white group-hover:text-primary-400 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {post.desc}
                </p>
              </div>
            </div>
            
            <div className="p-6 pt-0 mt-4 border-t border-slate-900/50 flex justify-between items-center">
              <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1.5"><User size={10} /> {post.author}</span>
              <span className="text-[10px] font-bold text-primary-400 group-hover:text-primary-300 transition-colors flex items-center gap-1">
                Read
                <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Blog;
