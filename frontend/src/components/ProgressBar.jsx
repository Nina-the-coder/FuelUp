import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className={`w-full h-[20px] bg-amber-200 rounded-[5px] overflow-hidden`}>
      <div 
        className={`h-full bg-yellow rounded-[5px] transition-w`} 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;