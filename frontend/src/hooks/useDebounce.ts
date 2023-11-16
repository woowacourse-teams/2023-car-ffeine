import { useEffect, useCallback } from 'react';

export const useDebounce = <T>(
  func: (param: T) => void,
  dependencies: string[],
  delay: number,
  shouldClear?: boolean
) => {
  const callback = useCallback(func, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);

    if (shouldClear) {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [callback, delay, shouldClear]);
};
