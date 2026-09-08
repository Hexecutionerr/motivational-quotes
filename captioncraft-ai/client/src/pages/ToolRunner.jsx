import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getToolBySlug } from '../config/tools.config';
import { seoCategories, getSeoMetadata } from '../config/seoData.config';
import ToolLayout from '../components/tools/ToolLayout';
import ToolForm from '../components/tools/ToolForm';
import ToolOutput from '../components/tools/ToolOutput';
import Toast from '../components/common/Toast';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import InternalLinks from '../components/common/InternalLinks';
import { storage } from '../services/storage';
import { analytics } from '../services/analytics';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { generateContent } from '../services/api';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';

const ToolRunner = () => {
  // Capture parameters for Programmatic SEO routing
  const { toolSlug, categorySlug, topicSlug, slug } = useParams();
  
  // Resolve tool based on dynamic routes or legacy slug alias
  const activeSlug = toolSlug || slug;
  const tool = getToolBySlug(activeSlug);

  // Refs
  const abortControllerRef = useRef(null);

  // States
  const [prompt, setPrompt] = useState('');
  const [settingsState, setSettingsState] = useState({});
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);
  const [isStarred, setIsStarred] = useState(false);

  // Compile Dynamic Programmatic SEO variables
  const seoMeta = getSeoMetadata(tool, categorySlug, topicSlug);

  // Initialize/Reset states on slug transitions
  useEffect(() => {
    // Abort pending requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    if (tool) {
      setOutput('');
      setIsLoading(false);
      setError('');
      setToast(null);
      setIsStarred(false);

      // Track Page View
      analytics.trackPageView(window.location.pathname);

      // Add to Last Used Tools cache
      storage.addLastUsedTool(tool.slug);

      // 1. Dynamic placeholder pre-population based on Category & Topic
      if (categorySlug && seoCategories[categorySlug]) {
        const catName = seoCategories[categorySlug].name;
        const topicName = (categorySlug && topicSlug && seoCategories[categorySlug].topics[topicSlug]) || '';
        if (topicName) {
          setPrompt(`Create a ${tool.title.toLowerCase()} about ${catName} (${topicName}) showing: `);
        } else {
          setPrompt(`Create a ${tool.title.toLowerCase()} about ${catName} showing: `);
        }
      } else {
        setPrompt('');
      }
      
      // Initialize settings defaults
      const defaults = {};
      if (tool.settings) {
        tool.settings.forEach(s => {
          defaults[s.name] = s.options[0];
        });
      }
      setSettingsState(defaults);
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [slug, toolSlug, categorySlug, topicSlug, tool]);

  // Sync Starred status
  useEffect(() => {
    setIsStarred(storage.isFavorite(output));
  }, [output]);

  if (!tool) {
    return (
      <div className="w-full py-20 text-center space-y-6">
        <SEO title="Tool Not Found" description="The requested AI tool does not exist on ContentForge AI." />
        <div className="inline-flex w-16 h-16 bg-red-950/40 border border-red-900/50 rounded-2xl items-center justify-center text-red-500 mb-2">
          <AlertCircle size={28} />
        </div>
        <h3 className="text-2xl font-bold text-white">Tool Not Found</h3>
        <p className="text-slate-500 max-w-sm mx-auto text-sm leading-relaxed">
          The AI tool you are trying to access doesn't exist or has been relocated.
        </p>
        <div>
          <Link to="/tools" className="btn-primary inline-flex text-xs font-bold gap-1.5">
            <ArrowLeft size={14} /> Back to AI Tools
          </Link>
        </div>
      </div>
    );
  }

  // Generate dynamic JSON-LD Structured Data array for crawler indexing
  const getStructuredData = () => {
    const origin = window.location.origin;
    
    // BreadcrumbList Schema
    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${origin}/` },
        { "@type": "ListItem", "position": 2, "name": "AI Tools", "item": `${origin}/tools` },
        { "@type": "ListItem", "position": 3, "name": tool.title, "item": `${origin}/tools/${tool.slug}` }
      ]
    };

    if (categorySlug && seoCategories[categorySlug]) {
      breadcrumbList.itemListElement.push({
        "@type": "ListItem",
        "position": 4,
        "name": seoCategories[categorySlug].name,
        "item": `${origin}/tools/${tool.slug}/${categorySlug}`
      });
    }

    if (categorySlug && topicSlug && seoCategories[categorySlug]?.topics[topicSlug]) {
      breadcrumbList.itemListElement.push({
        "@type": "ListItem",
        "position": 5,
        "name": seoCategories[categorySlug].topics[topicSlug],
        "item": `${origin}/tools/${tool.slug}/${categorySlug}/${topicSlug}`
      });
    }

    // SoftwareApplication Schema
    const softwareApp = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": seoMeta?.title || tool.title,
      "operatingSystem": "All",
      "applicationCategory": "BusinessApplication",
      "description": seoMeta?.description || tool.description,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };

    // FAQPage Schema
    const faqPage = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `How to use this AI ${tool.title}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Simply type your description into the prompt box and click 'Generate Content'. Our system will run the request through optimized prompt templates using Gemini and Groq fallbacks.`
          }
        },
        {
          "@type": "Question",
          "name": "Do I need a credit card or token to write copy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No! ContentForge AI is 100% free with unlimited generation access and no subscription requirements."
          }
        }
      ]
    };

    return [breadcrumbList, softwareApp, faqPage];
  };

  // Handle Bookmarks/Starring
  const handleToggleStar = () => {
    if (!output) return;
    if (isStarred) {
      storage.removeFavoriteByText(output);
      setIsStarred(false);
      setToast({ message: "Removed from favorites!", type: "info" });
    } else {
      storage.addFavorite(tool.slug, tool.title, prompt, output);
      setIsStarred(true);
      setToast({ message: "Saved to favorites!", type: "success" });
    }
  };

  // Active Generation Call
  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    // Abort previous pending requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setToast({ message: "Previous request cancelled.", type: "info" });
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setError('');
    setOutput('');

    try {
      const response = await generateContent(tool.id, prompt, settingsState, controller.signal);

      if (response.success && response.data) {
        let resultText = '';

        // Process data formats from unified backend API
        if (Array.isArray(response.data)) {
          resultText = response.data.map((item, idx) => {
            if (item.text) {
              let chunk = item.text;
              if (item.hashtags && item.hashtags.length > 0) {
                chunk += '\n\n' + item.hashtags.map(t => t.startsWith('#') ? t : `#${t}`).join(' ');
              }
              if (item.author) {
                chunk += `\n\n— ${item.author}`;
              }
              return response.data.length > 1 ? `[Option ${idx + 1}]\n${chunk}` : chunk;
            }
            if (item.titles) {
              return `💡 Title Variations:\n${item.titles.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\n📝 Video Description Outline:\n${item.description}\n\n🏷️ Hashtags:\n${item.hashtags.join(' ')}`;
            }
            if (item.concept) {
              return `💡 Concept: ${item.concept}\n\n✍️ Suggested Caption:\n${item.caption}\n\n🏷️ Hashtags:\n${item.hashtags.map(t => t.startsWith('#') ? t : `#${t}`).join(' ')}`;
            }
            return typeof item === 'object' ? JSON.stringify(item, null, 2) : String(item);
          }).join('\n\n---\n\n');
        } else if (typeof response.data === 'object') {
          if (response.data.text) {
            resultText = response.data.text;
          } else {
            resultText = JSON.stringify(response.data, null, 2);
          }
        } else {
          resultText = String(response.data);
        }

        const trimmedOutput = resultText.trim();
        setOutput(trimmedOutput);
        
        // Caches to local history list
        storage.addRecentGeneration(tool.slug, tool.title, trimmedOutput);
        
        // Track success event in analytics
        analytics.trackEvent('generate_content_success', { tool: tool.id, timeMs: response.timeMs });

        setToast({ message: "Content generated successfully!", type: "success" });
      } else {
        throw new Error(response.error || "Invalid response format from server.");
      }
    } catch (err) {
      // Ignore manual abort cancels
      if (axios.isCancel(err) || err.name === 'CanceledError' || err.name === 'AbortError') {
        console.log("Request canceled by user.");
        return;
      }

      console.error("Content generation failed:", err);
      let errorMsg = "Connection failed. Please check if backend is running.";
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      } else if (err.message) {
        errorMsg = err.message;
      }
      
      // Track fail event in analytics
      analytics.trackEvent('generate_content_failed', { tool: tool.id, error: errorMsg });

      setError(errorMsg);
      setToast({ message: errorMsg, type: "error" });
    } finally {
      if (abortControllerRef.current === controller) {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    }
  };

  return (
    <div className="w-full">
      {/* Dynamic SEO Injector with Structured Schema Data */}
      <SEO 
        title={seoMeta?.title} 
        description={seoMeta?.description} 
        jsonLd={getStructuredData()}
      />

      {/* Auto-Breadcrumbs Navigation */}
      <Breadcrumbs 
        toolConfig={tool} 
        categorySlug={categorySlug} 
        topicSlug={topicSlug} 
      />

      <ToolLayout 
        title={seoMeta?.topicName ? `${tool.title} for ${seoMeta.categoryName} (${seoMeta.topicName})` : seoMeta?.categoryName ? `${tool.title} for ${seoMeta.categoryName}` : tool.title} 
        description={tool.description} 
        category={tool.category}
      >
        {/* Left side - Inputs & settings */}
        <div className="lg:col-span-5">
          <div className="glass-card p-6 border border-slate-800">
            <ToolForm
              value={prompt}
              onChange={setPrompt}
              onGenerate={handleGenerate}
              isLoading={isLoading}
              placeholder={tool.placeholder}
              settings={tool.settings}
              settingsState={settingsState}
              setSettingsState={setSettingsState}
              maxLength={1000}
            />
          </div>
        </div>

        {/* Right side - Outputs & actions */}
        <div className="lg:col-span-7 h-full">
          <ToolOutput 
            text={output}
            isLoading={isLoading}
            error={error}
            onRetry={handleGenerate}
            onClear={() => setOutput('')}
            isStarred={isStarred}
            onToggleStar={handleToggleStar}
            onCopy={() => setToast({ message: "Content copied to clipboard!", type: "success" })}
          />
        </div>
      </ToolLayout>

      {/* Programmatic Internal Linking Ring */}
      <InternalLinks 
        toolConfig={tool} 
        categorySlug={categorySlug} 
        topicSlug={topicSlug} 
      />

      {/* Toast Notification Trigger Overlay */}
      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToolRunner;
