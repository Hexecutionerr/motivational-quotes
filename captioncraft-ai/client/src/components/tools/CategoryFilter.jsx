import React from 'react';

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-900 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`flex-shrink-0 px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all border ${
            activeCategory === cat
              ? "bg-white text-slate-950 border-white shadow-lg scale-102"
              : "bg-slate-900 text-slate-400 border-slate-800 hover:border-primary-500/30 hover:bg-slate-800 hover:text-slate-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
