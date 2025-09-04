import React from "react";
import Image from "next/image";

type SearchBarProps = {
  filterText: string;
  onFilterTextChange: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = ({ filterText, onFilterTextChange }: SearchBarProps) => {
  return (
    <form className="search-form flex items-center justify-between relative ">
      <input
        type="text"
        value={filterText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onFilterTextChange(e.target.value)
        }
        data-testid="search-transactions"
        placeholder="Search transaction"
        className="w-full h-[2.8125rem] px-4 border border-[#98908b] rounded-lg md:placeholder-[Search transaction] placeholder-[Search trans]"
      />
      <Image
        src="/assets/images/icon-search.svg"
        alt="search icon"
        className="absolute top-4 right-4"
        height={16}
        width={16}
      />
    </form>
  );
};

export default SearchBar;
