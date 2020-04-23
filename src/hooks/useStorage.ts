import { useState, useEffect } from "react";

function useStorage(key: string, initialValue: string) {
  const [value, setValue] = useState<string | null>(initialValue);

  useEffect(() => {
    if (value) {
      localStorage.setItem(key, value);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useStorage;
