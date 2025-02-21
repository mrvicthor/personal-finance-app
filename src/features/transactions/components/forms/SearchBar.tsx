import React from "react";
import Image from "next/image";
import searchIcon from "../../../../../public/assets/images/icon-search.svg";

type SearchBarProps = {
  filterText: string;
  onFilterTextChange: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = ({ filterText, onFilterTextChange }: SearchBarProps) => {
  return (
    <form className="search-form flex items-center justify-between relative ">
      <input
        type="search"
        value={filterText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onFilterTextChange(e.target.value)
        }
        placeholder="Search transaction"
        className="hidden md:block w-full h-[2.8125rem] px-4 border border-[#98908b] rounded-lg"
      />
      <input
        type="search"
        value={filterText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onFilterTextChange(e.target.value)
        }
        placeholder="Search trans"
        className=" md:hidden w-full h-[2.8125rem] px-4 border border-[#98908b] rounded-lg"
      />
      <Image
        src={searchIcon}
        alt="search icon"
        className="absolute top-4 right-4"
      />
    </form>
  );
};

export default SearchBar;
