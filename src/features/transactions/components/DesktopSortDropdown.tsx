import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOption } from "./FilterTransactionsTable";

type DesktopSortDropdownProps = {
  sortBy: string;
  handleSort: React.Dispatch<React.SetStateAction<SortOption>>;
  sortOptions: SortOption[];
};
const DesktopSortDropdown = ({
  sortBy,
  handleSort,
  sortOptions,
}: DesktopSortDropdownProps) => {
  return (
    <>
      <p className="sortby-text hidden sm:block">Sort by</p>
      <div className="hidden sm:block">
        <Select
          value={sortBy}
          onValueChange={(value: string) => handleSort(value as SortOption)}
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
    </>
  );
};

export default DesktopSortDropdown;
