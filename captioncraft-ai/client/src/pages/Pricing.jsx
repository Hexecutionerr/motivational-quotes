import React, { useState } from 'react';
import { Layers, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' or 'yearly'

  const plans = [
    {
      name: "Starter Feed",
      priceMonthly: 0,
      priceYearly: 0,
      desc: "Perfect for exploring frameworks and daily content inspiration.",
      features: [
        "10 AI Generations / month",
        "Standard Social Feed Access",
        "General Categories & Filters",
        "Hindi & English support",
        "Copy to Clipboard"
      ],
      cta: "Get Started Free",
      popular: false,
      glow: "border-slate-800"
    },
    {
      name: "Creator Pro",
      priceMonthly: 19,
      priceYearly: 15,
      desc: "Architect unlimited content, hook formulas, and campaigns.",
      features: [
        "Unlimited AI Generations",
        "Access to Interactive AI Planner",
        "Specialized Post Idea Blueprints",
        "Copywriting Framework Templates",
        "Local bookmark collection saver",
        "Priority queue processing",
        "24/7 Creator Support"
      ],
      cta: "Upgrade to Pro",
      popular: true,
      glow: "border-primary-500/50 shadow-lg shadow-primary-500/5 bg-slate-900"
    },
    {
      name: "Agency Studio",
      priceMonthly: 49,
      priceYearly: 39,
      desc: "Designed for multi-brand management and marketing agencies.",
      features: [
        "Everything in Creator Pro",
        "5 Collaboration Seats",
        "Custom Brand Voice Tuning",
        "Multi-Platform SEO optimization",
        "Advanced Analytics & Logs",
        "Dedicated Account Architect"
      ],
      cta: "Contact Sales",
      popular: false,
      glow: "border-slate-800"
    }
  ];

  return (
    <div className="w-full pb-20 pt-4 text-left relative">
      {/* Glow background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <section className="mb-16 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-950/40 text-accent-400 font-semibold text-xs mb-6 border border-accent-900/50 uppercase tracking-wider">
          <Layers size={12} />
          SaaS Pricing Plans
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
          Premium Solutions for <span className="text-gradient">Every Creator</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
          Start for free and upgrade as your channel grows. Cancel anytime.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <span className={`text-sm font-semibold ${billingPeriod === 'monthly' ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
          <button 
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
            className="w-12 h-6 rounded-full bg-slate-800 p-1 flex items-center transition-all relative border border-slate-700"
          >
            <div className={`w-4 h-4 rounded-full bg-primary-500 transition-all ${billingPeriod === 'yearly' ? 'translate-x-6' : ''}`}></div>
          </button>
          <span className={`text-sm font-semibold flex items-center gap-2 ${billingPeriod === 'yearly' ? 'text-white' : 'text-slate-500'}`}>
            Yearly 
            <span className="text-[10px] bg-accent-950 text-accent-400 border border-accent-900 px-2 py-0.5 rounded font-bold uppercase">Save 20%</span>
          </span>
        </div>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
        {plans.map((plan, idx) => (
          <div 
            key={idx} 
            className={`border rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 hover:border-slate-700/80 ${plan.glow}`}
          >
            {plan.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                Most Popular
              </span>
            )}
            
            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-bold text-xl text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{plan.desc}</p>
              </div>

              <div className="flex items-baseline gap-1 text-white border-y border-slate-900 py-6">
                <span className="text-4xl font-black font-heading">
                  ${billingPeriod === 'monthly' ? plan.priceMonthly : plan.priceYearly}
                </span>
                <span className="text-sm text-slate-500 font-medium">/ month</span>
                {billingPeriod === 'yearly' && plan.priceMonthly > 0 && (
                  <span className="text-xs text-slate-600 line-through pl-2">Billed Annually</span>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Included Features</h4>
                <ul className="space-y-3">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex gap-2.5 items-start text-xs text-slate-300">
                      <CheckCircle2 size={15} className="text-primary-500 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button 
              className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all mt-8 border flex items-center justify-center gap-1.5 ${
                plan.popular 
                  ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white border-transparent shadow-lg shadow-primary-500/20 hover:brightness-110 active:scale-98"
                  : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-900 hover:text-white"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Pricing;
