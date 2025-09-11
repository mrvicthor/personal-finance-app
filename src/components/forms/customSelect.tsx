import { useState, useRef, useEffect } from "react";
import { themes } from "@/helpers";
import { getPots } from "@/features/pots/actions/pots";

type CustomThemeSelectProps = {
  id: string;
  label: string;
  name: string;
  error?: string;
};

export default function CustomThemeSelect({
  error,
  id,
  label,
  name,
}: CustomThemeSelectProps) {
  const [usedThemes, setUsedThemes] = useState<string[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("Theme");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const updateTheme = async () => {
      const data = await getPots();
      if (!data) return;
      const themes = data.map((pot) => pot.theme);
      setUsedThemes(themes);
    };
    updateTheme();
  }, []);

  const handleOptionSelect = (value: string, label: string) => {
    setSelectedValue(value);
    setSelectedLabel(label);
    setIsOpen(false);
  };

  const selectedTheme = themes.find((theme) => theme.theme === selectedValue);

  return (
    <div className="">
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
            <div className="flex items-center">
              {selectedTheme && (
                <span
                  className="h-4 w-4 rounded-full mr-2 inline-block"
                  style={{ backgroundColor: selectedTheme.theme }}
                />
              )}
              <span className={selectedValue ? "text-black" : "text-gray-500"}>
                {selectedLabel}
              </span>
            </div>
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
              className="absolute left-0 right-0 bg-white border border-[#98908B] rounded-md shadow-lg z-50"
              style={{ bottom: "calc(100% + 1rem)" }}
              data-testid={`select-options-${name}`}
            >
              {themes.map((theme) => {
                const isUsed = usedThemes.includes(theme.theme);
                return (
                  <button
                    key={theme.theme}
                    type="button"
                    onClick={() =>
                      !isUsed && handleOptionSelect(theme.theme, theme.label)
                    }
                    disabled={isUsed}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs first:rounded-t-md last:rounded-b-md transition-colors ${
                      isUsed
                        ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                        : "bg-white hover:bg-gray-100 cursor-pointer"
                    }`}
                    data-testid={`option-${theme.theme}`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-4 w-4 rounded-full inline-block"
                        style={{ backgroundColor: theme.theme }}
                      />
                      <span>{theme.label}</span>
                    </div>
                    {isUsed && (
                      <span className="text-xs text-gray-400">
                        Already Used
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
