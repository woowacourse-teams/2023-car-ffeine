export const getTypedObjectKeys = <T extends object>(obj: T) => {
  return Object.keys(obj) as Array<keyof T>;
};
