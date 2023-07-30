export const getTypedObjectFromEntries = <T extends string | symbol, K>(
  keys: readonly T[],
  values: readonly K[]
): { [Key in T]: K } =>
  keys.reduce((result, key, index) => {
    result[key] = values[index];
    return result;
  }, {} as { [Key in T]: K });
