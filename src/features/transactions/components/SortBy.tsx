"use client";
import { SortOption } from "./FilterTransactionsTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MobileSortDropdown from "./MobileSortDropdown";

type SortByProps = {
  onHandleSort: React.Dispatch<React.SetStateAction<SortOption>>;
  sortBy: string;
};
const sortOptions: SortOption[] = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
];
const SortBy = ({ onHandleSort, sortBy }: SortByProps) => {
  return (
    <div className="flex items-center gap-2 sortby">
      <MobileSortDropdown
        sortBy={sortBy}
        handleSort={onHandleSort}
        sortOptions={sortOptions}
      />

      <p className="sortby-text hidden sm:block">Sort by</p>
      <div className="hidden sm:block">
        <Select
          value={sortBy}
          onValueChange={(value: string) => onHandleSort(value as SortOption)}
        >
          <SelectTrigger className="w-[113px] h-[2.8125rem]">
            <SelectValue placeholder="Latest" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option} value={option} className="capitalize">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SortBy;
