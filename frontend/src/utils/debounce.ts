export type DebounceFunction = <T extends ((...args: T) => void)[]>(
  func: (...args: T) => void,
  delay: number
) => (...args: T) => void;

export const debounce: DebounceFunction = (func, delay) => {
  let timerId: NodeJS.Timeout;

  return (...args) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
