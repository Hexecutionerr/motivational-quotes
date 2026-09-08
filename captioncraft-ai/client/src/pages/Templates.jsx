import React, { useState } from 'react';
import { Sparkles, Copy, Check, Filter, Layers, FileText, CheckCircle2 } from 'lucide-react';

const templatesData = [
  {
    id: 1,
    title: "AIDA Framework",
    category: "Frameworks",
    platform: "Multi-Platform",
    desc: "Attention, Interest, Desire, Action. The gold standard for copywriting and sales emails.",
    template: "[Attention]: Did you know that 85% of SaaS startups fail within the first year? \n\n[Interest]: It's not because of their product. It's because they build in isolation without validation. \n\n[Desire]: Imagine having a waiting list of 1,000+ ready-to-pay users before you write a single line of code. \n\n[Action]: Grab our free SaaS Validation Checklist and save 6 months of wasted work. [Link]"
  },
  {
    id: 2,
    title: "PAS Framework",
    category: "Frameworks",
    platform: "Multi-Platform",
    desc: "Problem, Agitate, Solve. Focuses on the customer's pain point and agitates it before presenting the solution.",
    template: "[Problem]: Writing high-converting copy is hard. Most founders spend hours drafting, only to get zero clicks. \n\n[Agitate]: You're losing potential leads, wasting advertising budget, and letting competitors win. All because of a weak headline. \n\n[Solve]: ContentForge AI templates do the heavy lifting. Generate battle-tested copy formats in seconds. Try it free."
  },
  {
    id: 3,
    title: "The Twitter/X Hook",
    category: "Social",
    platform: "Twitter",
    desc: "High-curiosity thread hooks designed to maximize impressions and retweets.",
    template: "I analyzed 500 landing pages that did $1M+ in sales. \n\nHere are 7 psychological copywriting tricks they use to make you buy (and how to copy them): 🧵👇"
  },
  {
    id: 4,
    title: "YouTube Video Intro",
    category: "Video",
    platform: "YouTube",
    desc: "The 15-second hook to prevent drop-off and retain viewer attention.",
    template: "If you're still using default styles on your web apps, you're losing customers. In this video, I'll show you exactly how to implement premium glassmorphic layouts in 5 minutes. No complex libraries needed. Let's dive in."
  },
  {
    id: 5,
    title: "LinkedIn Thought Leadership",
    category: "Social",
    platform: "LinkedIn",
    desc: "Clean line breaks, readable insights, and professional spacing.",
    template: "I used to think working 80-hour weeks was a badge of honor. \n\nThen I burned out. \n\nHere is what I learned about developer productivity: \n\n1. Systems beat willpower. \n2. Code deletion is better than code creation. \n3. Rest is a strategic asset. \n\nAgree? What's your #1 rule for avoiding burnout?"
  },
  {
    id: 6,
    title: "Product Launch Hook",
    category: "SaaS",
    platform: "Product Hunt",
    desc: "Exciting, values-driven launch template to increase upvotes and registrations.",
    template: "🚀 Today, we are launching ContentForge AI! \n\nWe built it because we were tired of staring at empty Notion pages trying to figure out what to write next. \n\nHere's what it does: \n- Generates viral social copy \n- Accesses PAS, AIDA, and Hook formulas \n- Chatbot strategist integration \n\nWe'd love to hear your feedback in the comments!"
  }
];

const Templates = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  const categories = ['All', 'Frameworks', 'Social', 'Video', 'SaaS'];

  const filteredTemplates = activeTab === 'All'
    ? templatesData
    : templatesData.filter(t => t.category === activeTab);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full pb-20 pt-4 text-left">
      <section className="mb-16">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-950/40 text-accent-400 font-semibold text-xs mb-6 border border-accent-900/50 uppercase tracking-wider">
          <FileText size={12} />
          Copywriting Formulas
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
          Pre-Formatted <span className="text-gradient">Copy Templates</span>
        </h2>
        <p className="text-slate-400 max-w-2xl text-base md:text-lg">
          Save hours drafting marketing assets. Choose a framework, copy the structure, and plug in your product details.
        </p>
      </section>

      {/* Tabs */}
      <section className="mb-8 border-b border-slate-900 pb-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all border ${
                activeTab === cat
                  ? "bg-white text-slate-950 border-white shadow-lg"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:border-primary-500/30 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredTemplates.map((item) => (
          <div key={item.id} className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between relative group">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold text-accent-400 bg-accent-950/40 border border-accent-900/50 px-2.5 py-1 rounded-md">
                  {item.category}
                </span>
                <span className="text-xs text-slate-500 font-medium font-mono">{item.platform}</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">{item.desc}</p>
              
              <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 font-mono text-xs text-slate-300 whitespace-pre-line leading-relaxed mb-6 select-all select-none">
                {item.template}
              </div>
            </div>

            <button
              onClick={() => handleCopy(item.id, item.template)}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-all border flex items-center justify-center gap-2 ${
                copiedId === item.id
                  ? "bg-emerald-950/50 text-emerald-400 border-emerald-900"
                  : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-primary-950/40 hover:text-primary-400"
              }`}
            >
              {copiedId === item.id ? (
                <>
                  <Check size={16} />
                  Copied Structure
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy Template
                </>
              )}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Templates;
