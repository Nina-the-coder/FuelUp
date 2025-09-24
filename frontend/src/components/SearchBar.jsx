import React from "react";
import VariantButton from "./VariantButton";

const SearchBar = ({text}) => {
  return (
    <div className="h-[40px] flex w-full border rounded-xl border-card-bg/80 bg-white">
      <input
        className="h-full rounded-l-xl w-full px-4 py-0 "
        placeholder={text}
      />
      <div className="h-full w-[40px]">

      <VariantButton className="" size="free" variant="cta" icon="search" />
      </div>
    </div>
  );
};

export default SearchBar;
