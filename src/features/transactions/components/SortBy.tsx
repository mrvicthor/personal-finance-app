import DesktopSortDropdown from "./DesktopSortDropdown";
import { SortOption } from "./FilterTransactionsTable";

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

      <DesktopSortDropdown
        handleSort={onHandleSort}
        sortBy={sortBy}
        sortOptions={sortOptions}
      />
    </div>
  );
};

export default SortBy;
