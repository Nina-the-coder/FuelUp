// Dropdown.jsx
import React from "react";

/**
 * Controlled Dropdown
 * Props:
 *  - options: array of strings
 *  - value: selected string
 *  - onChange: (value) => void
 */
const Dropdown = ({ options = [], value = options[0] || "", onChange = () => {}, className = "" }) => {
  return (
    <select
      className={`h-[40px] w-full rounded-xl px-3 border border-gray-200 bg-white text-sm ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Select option"
    >
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
