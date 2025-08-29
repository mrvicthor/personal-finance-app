import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/helpers";

type CategoryFieldProps = {
  id: string;
  label: string;
  name: string;
  error?: string[];
};

const CategoryField = ({ id, label, name, error }: CategoryFieldProps) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <label
          htmlFor={id}
          className="capitalize text-[#696868] text-xs font-bold"
        >
          {label}
        </label>
        <Select name={name}>
          <SelectTrigger className="h-[45px] border-[#98908B]">
            <SelectValue placeholder="Entertainment" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => {
              return (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

export default CategoryField;
