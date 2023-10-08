export const addUnit = (prop: number | string, spacing?: number) => {
  if (typeof prop === 'string') {
    return prop;
  }

  const defaultSpacing = spacing === undefined ? 1 : spacing;

  return `${(prop * defaultSpacing) / 1}rem`;
};
