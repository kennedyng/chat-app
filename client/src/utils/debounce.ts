export type DebouncedFunction<T extends any[]> = (...args: T) => void;

export const debounce = <T extends any[]>(
  func: (...args: T) => void,
  delay: number
): DebouncedFunction<T> => {
  let timeoutId: number;

  return (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
