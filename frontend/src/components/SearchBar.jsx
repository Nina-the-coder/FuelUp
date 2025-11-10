// SearchBar.jsx
import React from "react";
import VariantButton from "./VariantButton";

/**
 * Controlled SearchBar
 * Props:
 *  - value (string)
 *  - onChange (value) => void
 *  - placeholder (string)
 */
const SearchBar = ({ value = "", onChange = () => {}, placeholder = "Search..." }) => {
  return (
    <div className="flex items-center h-[40px] border rounded-xl border-gray-200 bg-white overflow-hidden">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 h-full outline-none text-sm"
        aria-label={placeholder}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="h-full px-2"
        >
          ✕
        </button>
      )}
      <div className="h-full px-2">
        <VariantButton onClick={() => {}} size="smsquare" variant="ghost" icon="search" aria-label="Search" />
      </div>
    </div>
  );
};

export default SearchBar;
