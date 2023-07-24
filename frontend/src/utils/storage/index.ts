export const getLocalStorage = <T>(key: string, initialValue: T): T => {
  const item = localStorage.getItem(key);

  return item ? (JSON.parse(item) as T) : initialValue;
};

export const setLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorage = <T>(key: string, initialValue: T): T => {
  const item = sessionStorage.getItem(key);

  return item ? (JSON.parse(item) as T) : initialValue;
};

export const setSessionStorage = <T>(key: string, value: T) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};
