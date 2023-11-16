import { useEffect, useCallback } from 'react';

export const useDebounce = <T>(func: (param: T) => void, dependencies: string[], delay: number) => {
  const callback = useCallback(func, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);

    return () => clearTimeout(timeout);
  }, [callback, delay]);
};
