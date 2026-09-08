import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { seoCategories } from '../../config/seoData.config';

const Breadcrumbs = ({ toolConfig, categorySlug, topicSlug }) => {
  const crumbs = [
    { label: 'Home', path: '/', isLast: false }
  ];

  crumbs.push({ label: 'AI Tools', path: '/tools', isLast: !toolConfig });

  if (toolConfig) {
    const isLast = !categorySlug;
    crumbs.push({ 
      label: toolConfig.title, 
      path: `/tools/${toolConfig.slug}`, 
      isLast 
    });
  }

  if (toolConfig && categorySlug && seoCategories[categorySlug]) {
    const catName = seoCategories[categorySlug].name;
    const isLast = !topicSlug;
    crumbs.push({ 
      label: catName, 
      path: `/tools/${toolConfig.slug}/${categorySlug}`, 
      isLast 
    });
  }

  if (toolConfig && categorySlug && topicSlug && seoCategories[categorySlug]?.topics[topicSlug]) {
    const topName = seoCategories[categorySlug].topics[topicSlug];
    crumbs.push({ 
      label: topName, 
      path: `/tools/${toolConfig.slug}/${categorySlug}/${topicSlug}`, 
      isLast: true 
    });
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="flex items-center gap-1.5 py-3 text-[10px] md:text-xs font-bold text-slate-500 mb-6 flex-wrap"
    >
      {crumbs.map((crumb, idx) => (
        <React.Fragment key={crumb.path}>
          {idx > 0 && <ChevronRight size={12} className="text-slate-700 flex-shrink-0" />}
          {crumb.isLast ? (
            <span className="text-slate-300 font-semibold" aria-current="page">
              {crumb.label}
            </span>
          ) : (
            <Link 
              to={crumb.path} 
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              {crumb.label === 'Home' && <Home size={11} className="mb-0.5" />}
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
