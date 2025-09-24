import React from "react";

const Dropdown = ({ options, selectedOption, onSelect, className }) => {
  return (
    <select
      className={`border h-[40px] w-full rounded-xl px-4 py-0.5 border-card-bg/80 bg-white ${className}`}
      value={selectedOption}
      onChange={(e) => onSelect(e.target.value)}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
