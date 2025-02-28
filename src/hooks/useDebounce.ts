import { useState, useEffect } from "react";
const useDebounce = (value: string, delay: number = 3000) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, value]);

  return debouncedValue;
};

export default useDebounce;
