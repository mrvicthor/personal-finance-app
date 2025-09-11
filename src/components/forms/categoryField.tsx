import { categories } from "@/helpers";
import { useEffect, useRef, useState } from "react";

type CategoryFieldProps = {
  id: string;
  label: string;
  name: string;
  error?: string[];
  selectLabel: string;
};

const SelectField = ({
  id,
  label,
  name,
  error,
  selectLabel,
}: CategoryFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(selectLabel);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);

  const handleOptionSelect = (value: string, label: string) => {
    setSelectedValue(value);
    setSelectedLabel(label);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="capitalize text-[#696868] text-xs font-bold"
      >
        {label}
      </label>
      <div className="relative" ref={dropdownRef}>
        <input
          type="hidden"
          name={name}
          value={selectedValue}
          data-testid={`select-${name}`}
        />
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-[45px] px-3 py-2 border border-[#98908B] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-left flex items-center justify-between"
          data-testid={`select-trigger-${name}`}
        >
          <span className={selectedValue ? "text-black" : "text-gray-500"}>
            {selectedLabel}
          </span>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isOpen && (
          <div
            className="absolute left-0 right-0 bg-white border border-[#98908B] rounded-md modal-box-shadow z-50 divide-y"
            style={{ top: "calc(100% + 1rem)" }}
            data-testid={`select-options-${name}`}
          >
            {categories.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() =>
                  handleOptionSelect(category.value, category.label)
                }
                className="w-full px-3 py-2 text-left bg-white hover:bg-gray-100 first:rounded-t-md last:rounded-b-md transition-colors"
                data-testid={`option-${category.value}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SelectField;
