export const addUnit = (prop: number | string) => {
  if (typeof prop === 'string') return prop;

  return `${prop}rem`;
};
