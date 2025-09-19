import React from "react";

const DayButton = ({ day, isSelected, onClick }) => {
  const baseClasses =
    "flex items-center justify-center hover:cursor-pointer pl-0.5 gap-1 border-2 rounded-xl";
  const selectedClasses = isSelected
    ? "bg-text/70 border-cta text-white"
    : "bg-white border-black/10 text-black hover:bg-gray-100";
  const classes = `${baseClasses} ${selectedClasses} h-[30px] sm:w-[50px] text-[14px] sm:text-[16px] px-1`;
  return (
    <button type="button" className={classes} onClick={onClick}>
      <span className="">{day}</span>
    </button>
  );
};

export default DayButton;
