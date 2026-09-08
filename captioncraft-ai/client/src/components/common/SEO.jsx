import React, { useEffect } from 'react';

/**
 * Dynamic SEO Component to manage document head metadata.
 * Inject titles, descriptions, Open Graph details, and canonical tags.
 */
const SEO = ({ title, description, ogType = 'website', canonicalUrl, jsonLd }) => {
  useEffect(() => {
    // 1. Title tag updates
    const defaultTitle = 'ContentForge AI | Premium AI Writing & Marketing Copy Generator';
    const finalTitle = title ? `${title} | ContentForge AI` : defaultTitle;
    document.title = finalTitle;

    // 2. Meta description tag updates
    const defaultDesc = 'ContentForge AI helps you generate high-converting social media captions, LinkedIn posts, video scripts, YouTube titles, and e-commerce copy using Google Gemini.';
    const finalDesc = description || defaultDesc;

    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', finalDesc);

    // 3. Open Graph and Twitter Card tags
    const activeUrl = canonicalUrl || window.location.href;
    const metaMap = {
      'og:title': finalTitle,
      'og:description': finalDesc,
      'og:type': ogType,
      'og:url': activeUrl,
      'twitter:card': 'summary_large_image',
      'twitter:title': finalTitle,
      'twitter:description': finalDesc
    };

    Object.entries(metaMap).forEach(([prop, val]) => {
      const selector = prop.startsWith('og:') ? `meta[property="${prop}"]` : `meta[name="${prop}"]`;
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        if (prop.startsWith('og:')) {
          tag.setAttribute('property', prop);
        } else {
          tag.setAttribute('name', prop);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', val);
    });

    // 4. Canonical Link tag updates
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', activeUrl);

    // 5. Inject Structured JSON-LD Data schemas
    const oldScripts = document.querySelectorAll('script[type="application/ld+json"].seo-schema');
    oldScripts.forEach(s => s.remove());

    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      schemas.forEach(schemaObj => {
        const script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('class', 'seo-schema');
        script.innerHTML = JSON.stringify(schemaObj);
        document.head.appendChild(script);
      });
    }

    return () => {
      // Cleanup on unmount or prop changes
      const currentScripts = document.querySelectorAll('script[type="application/ld+json"].seo-schema');
      currentScripts.forEach(s => s.remove());
    };

  }, [title, description, ogType, canonicalUrl, jsonLd]);

  return null;
};

export default SEO;
