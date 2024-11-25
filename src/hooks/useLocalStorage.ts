import { useState } from "react";

interface UseLocalStorageProps<T> {
  key: string;
  initialValue: T;
}

/**
 * @description
 * 해당 훅은 로컬 스토리지를 사용하는 훅입니다.
 *  
 * const [value, setValue] = useLocalStorage({ key: 'test', initialValue: 'test' });
 *  
 * setValue('test2');
 * 
 */
const useLocalStorage = <T>({ key, initialValue }: UseLocalStorageProps<T>) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setLocalStorage = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  }

  return [storedValue, setLocalStorage] as const;
}

export default useLocalStorage;