/**
 * 
 * @description 
 * Object.fromEntries(
      KEYS.map((day, index) => {
        return [day, VALUES[index]];
      })
 * ) → 이 메서드를 사용할 때 key 타입 추론이 되지 않는 문제를 해결하기 위해 구현
 * @param keys KEY 배열 (객체의 key들)
 * @param values VALUE 배열 (하나의 key당 올 수 있는 value들)
 * @example getTypedObjectFromEntries(KEYS, VALUES)
 * @returns {Object} An object with key-value pairs.
 * @property key: value | value | value | ...
 * @property key: value | value | value | ... 
 * @property key: value | value | value | ...
 * @example getTypedObjectFromEntries(
      KEYS,
      KEYS.map(() => OBJECTS)
    )
 * @returns {Object} An object with key-value pairs.
 * @property key: value[OBJECT, {...}, ...] (= key: object[])
 * @property key: value[OBJECT, {...}, ...] 
 * @property key: value[OBJECT, {...}, ...]
 */

export const getTypedObjectFromEntries = <T extends string | symbol, K>(
  keys: readonly T[],
  values: readonly K[]
): { [Key in T]: K } =>
  keys.reduce(
    (result, key, index) => {
      result[key] = values[index];

      return result;
    },
    {} as { [Key in T]: K }
  );
