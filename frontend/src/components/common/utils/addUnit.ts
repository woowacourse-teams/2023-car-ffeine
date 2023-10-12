export const addUnit = (
  prop: number | string,
  /** 기본 spacing 단위, prop이 number일 때 4를 넣으면 (prop * 0.4)rem이 return 된다. */
  spacing?: number
) => {
  if (typeof prop === 'string') {
    return prop;
  }

  return `${spacing === undefined ? prop : (prop * spacing) / 10}rem`;
};
