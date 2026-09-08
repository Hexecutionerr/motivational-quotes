import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquare, BookOpen, Layers, CheckCircle2, ChevronDown, Award, Star, ArrowRight, ShieldCheck, Zap, Users } from 'lucide-react';
import SEO from '../components/common/SEO';

const Landing = () => {
  // FAQ state
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const tools = [
    {
      icon: <Sparkles className="text-primary-400" size={24} />,
      title: "Viral Copy Architect",
      desc: "Generate highly engaging, copy-paste-ready captions with targeted hashtags and optimal emojis for Instagram and Facebook.",
      path: "/tools"
    },
    {
      icon: <Layers className="text-accent-400" size={24} />,
      title: "Social Post Ideas",
      desc: "Struggling with what to post? Get full concept blueprints, visual directions, and copywriting prompts in seconds.",
      path: "/ideas"
    },
    {
      icon: <MessageSquare className="text-emerald-400" size={24} />,
      title: "Interactive AI Planner",
      desc: "Brainstorm marketing campaigns, hashtags, and growth hooks directly with our context-aware creator chatbot.",
      path: "/chat"
    },
    {
      icon: <BookOpen className="text-violet-400" size={24} />,
      title: "Copywriter Templates",
      desc: "Access structured, battle-tested copywriting formulas (AIDA, PAS) for threads, scripts, and product launches.",
      path: "/templates"
    }
  ];

  const features = [
    {
      icon: <Zap className="text-yellow-400" size={20} />,
      title: "Ultra-Fast Generation",
      desc: "Leverages Google's high-speed Gemini 2.0 Flash API to generate production-quality text in milliseconds."
    },
    {
      icon: <Users className="text-primary-400" size={20} />,
      title: "Bilingual English & Hindi",
      desc: "Supports native Devanagari Hindi and English content styles, custom-tailored for regional social campaigns."
    },
    {
      icon: <Award className="text-accent-400" size={20} />,
      title: "Premium Aesthetics",
      desc: "Modern layouts with glassmorphic cards, smooth page entries, and an interactive feed designed to inspire."
    },
    {
      icon: <ShieldCheck className="text-emerald-400" size={20} />,
      title: "No-Log Security & Privacy",
      desc: "Your prompts and context are secured and encrypted, protecting your brand intelligence and proprietary copy."
    }
  ];

  const testimonials = [
    {
      quote: "ContentForge AI saved me hours of brainstorming. The post ideas module gave me concepts that actually went viral on Instagram Reels!",
      author: "Aanya Mehta",
      role: "Lifestyle Creator (120k+ Followers)",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
    },
    {
      quote: "The bilingual Hindi-English generation is a game changer for our local digital agency. Highly recommend the Interactive Planner.",
      author: "Rohan Sharma",
      role: "Founder, PeakMedia Agency",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
    },
    {
      quote: "The PAS and AIDA copy templates are flawless. I just drop my product details and it formats high-converting Twitter threads instantly.",
      author: "David K.",
      role: "SaaS Indie Hacker",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces"
    }
  ];

  const faqs = [
    {
      q: "What is ContentForge AI?",
      a: "ContentForge AI is an advanced, production-grade social media copywriting and concept generation platform. It helps content creators, marketing agencies, and brands write high-converting captions, brainstorm visual directions, and chat with a strategic AI assistant."
    },
    {
      q: "Does it support Hindi content generation?",
      a: "Yes! ContentForge AI natively supports both English and Hindi (Devanagari script) generation across all creative tools, ensuring you can connect with diverse audiences."
    },
    {
      q: "How does the Fallback Service work?",
      a: "If the AI model is temporarily rate-limited or unavailable, our system automatically switches to an optimized database of hand-picked premium captions and templates. You will always have access to inspiring content without disruption."
    },
    {
      q: "Are the generated copies unique?",
      a: "Yes, our custom prompting architecture ensures Google Gemini generates highly customized, original content based on the unique situation, mood, or niche you provide."
    }
  ];

  return (
    <div className="w-full relative overflow-hidden">
      <SEO 
        title="AI Copywriting & Creator SaaS Platform" 
        description="Write high-converting Instagram captions, viral LinkedIn posts, blog scripts, and YouTube SEO tags using Google Gemini AI. Free access forever."
      />
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 text-center max-w-5xl mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-xs tracking-wider uppercase shadow-inner">
            <Sparkles size={12} className="text-primary-400 animate-pulse" />
            Introducing ContentForge AI 1.0
          </span>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight">
            Architect Viral Content <br className="hidden md:inline" />
            With <span className="text-gradient">AI Precision</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Stop staring at a blank page. Generate high-engagement copy, social blueprints, and campaign concepts tailored to your brand voice instantly.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/tools" className="btn-primary !px-8 !py-3.5 text-base font-semibold group shadow-xl shadow-primary-500/20 w-full sm:w-auto">
              Start Building Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/pricing" className="btn-secondary !px-8 !py-3.5 text-base font-semibold w-full sm:w-auto">
              View Plans & Pricing
            </Link>
          </div>
        </motion.div>

        {/* Dynamic Mockup Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 md:mt-24 relative max-w-4xl mx-auto"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl blur opacity-25"></div>
          <div className="relative bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900/80 border-b border-slate-800/80">
              <div className="flex gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500/80"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-xs text-slate-500 font-mono">contentforge.ai/dashboard</span>
              <div className="w-10"></div>
            </div>
            
            {/* Mock Dashboard Body */}
            <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {/* Left pane - Config */}
              <div className="md:col-span-1 space-y-4 border-r border-slate-900 pr-0 md:pr-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Generator Settings</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-500">Platform</label>
                    <div className="w-full bg-slate-900 border border-slate-800 text-slate-300 text-xs px-3 py-2 rounded-lg mt-1 font-medium">Instagram</div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Brand Niche</label>
                    <div className="w-full bg-slate-900 border border-slate-800 text-slate-300 text-xs px-3 py-2 rounded-lg mt-1 font-medium">SaaS Growth</div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">AI Prompt Topic</label>
                    <div className="w-full bg-slate-900 border border-slate-800 text-slate-300 text-xs px-3 py-2.5 rounded-lg mt-1 text-slate-400">Launch hooks for developers</div>
                  </div>
                  <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-center text-xs font-semibold py-2.5 rounded-xl cursor-pointer shadow-md">
                    Generate Copy
                  </div>
                </div>
              </div>

              {/* Right pane - Generated Outputs */}
              <div className="md:col-span-2 space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Output Blueprint</h4>
                <div className="space-y-4">
                  <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl relative overflow-hidden group">
                    <span className="absolute top-2 right-2 text-[10px] bg-primary-950 text-primary-400 border border-primary-900 px-2 py-0.5 rounded-md font-semibold">Instagram</span>
                    <p className="text-sm text-slate-200 font-sans leading-relaxed">
                      "Indie hacking is 10% coding and 90% telling people why you coded it. Build in public, share the failures, celebrate the small wins. 🚀✨"
                    </p>
                    <div className="flex gap-2 mt-3">
                      <span className="text-[10px] text-slate-500">#indiehackers</span>
                      <span className="text-[10px] text-slate-500">#saas</span>
                      <span className="text-[10px] text-slate-500">#buildinpublic</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl relative overflow-hidden opacity-80">
                    <span className="absolute top-2 right-2 text-[10px] bg-accent-950 text-accent-400 border border-accent-900 px-2 py-0.5 rounded-md font-semibold">Post Concept</span>
                    <p className="text-xs text-slate-400 font-mono mb-1">Concept Idea:</p>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      Split screen comparing: (A) Designing features alone vs. (B) Testing live with users. Highlight the speed of validation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* TRUSTED BY CREATORS */}
      <section className="py-12 border-y border-slate-900 bg-slate-950/40 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">Trusted by creators at top channels and brands</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-lg md:text-xl font-heading font-black text-slate-400 tracking-wider">CREATORHQ</span>
            <span className="text-lg md:text-xl font-heading font-black text-slate-400 tracking-wider">AURAMEDIA</span>
            <span className="text-lg md:text-xl font-heading font-black text-slate-400 tracking-wider">TECHFLOW</span>
            <span className="text-lg md:text-xl font-heading font-black text-slate-400 tracking-wider">PEAKMEDIA</span>
          </div>
        </div>
      </section>

      {/* AI TOOLS SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Designed for the <span className="text-gradient">Modern Copywriter</span>
          </h2>
          <p className="text-slate-400 text-lg">
            No matter the platform or strategy, ContentForge AI provides structural models to draft copy instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, idx) => (
            <Link 
              to={tool.path} 
              key={idx}
              className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-500/20 hover:bg-slate-900/80 block text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800 mb-6 group-hover:scale-105 transition-transform duration-300">
                {tool.icon}
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">{tool.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{tool.desc}</p>
              <span className="text-xs font-semibold text-primary-400 inline-flex items-center gap-1 group-hover:text-primary-300 transition-colors">
                Launch Tool
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* DETAILED FEATURES */}
      <section className="py-20 border-t border-slate-900 bg-slate-950/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-left">
            <span className="text-xs font-bold text-accent-400 uppercase tracking-widest bg-accent-950/40 border border-accent-900/50 px-3.5 py-1.5 rounded-full">Speed & Security</span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Scale output without losing <span className="text-gradient">creative depth</span>.
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              We engineered a system that ensures high-quality marketing copy, secure processing pipelines, and a cache mechanism that protects your usage limits.
            </p>
            <div className="space-y-4 pt-4">
              {features.map((feat, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="p-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 mt-1">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-white">{feat.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-2xl text-left space-y-6">
              <h3 className="font-heading font-bold text-lg text-white">How we ensure uptime</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-400"><strong className="text-slate-200">Fallback Assets:</strong> Never experience 404s. Our database drops back to pre-written structures if quota limits are exceeded.</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-400"><strong className="text-slate-200">Express Rate Limit:</strong> Multi-tiered rate limit constraints ensure fair usage and DDoS protection.</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-400"><strong className="text-slate-200">Google DNS Failback:</strong> Implemented direct Google public DNS resolution overrides to prevent Windows connection dropouts.</p>
                </div>
              </div>
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-600 block mb-1 font-mono">SYSTEM LOG: STATUS</span>
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  All nodes active. Gemini engine operational.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Loved by <span className="text-gradient">Creators & Writers</span>
          </h2>
          <p className="text-slate-400 text-lg">
            See how social media managers and copywriters are utilizing ContentForge AI to write content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl text-left space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" className="text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              
              <div className="flex gap-3 items-center pt-6 border-t border-slate-900">
                <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover border border-slate-800" />
                <div>
                  <h5 className="font-heading font-bold text-sm text-white">{t.author}</h5>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-base">Everything you need to know about ContentForge AI.</p>
        </div>

        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left font-heading font-bold text-white hover:text-primary-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown size={18} className={`text-slate-500 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {activeFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed border-t border-slate-900/50 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4 relative z-10 max-w-5xl mx-auto">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl blur opacity-15"></div>
        <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-16 text-center space-y-8 overflow-hidden">
          {/* Radial visual glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Ready to Forge Your Next Viral Campaign?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Create a free account, test out copywriting templates, or chat with our content strategist today. No credit card required.
          </p>
          <div className="flex justify-center">
            <Link to="/tools" className="btn-primary !px-10 !py-4 text-base font-bold shadow-xl shadow-primary-500/20 group">
              Start Free Today
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
