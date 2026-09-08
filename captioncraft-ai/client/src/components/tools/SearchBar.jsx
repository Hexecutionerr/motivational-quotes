import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = "Search AI tools..." }) => {
  return (
    <div className="relative w-full max-w-md group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl blur opacity-15 group-hover:opacity-25 transition duration-500"></div>
      <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-2xl p-1.5 shadow-xl">
        <div className="pl-3.5 text-slate-500">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent border-none text-slate-100 placeholder-slate-500 px-3 py-2 outline-none text-sm focus:ring-0"
        />
      </div>
    </div>
  );
};

export default SearchBar;
