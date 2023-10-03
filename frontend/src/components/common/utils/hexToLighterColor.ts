type HashString = `#${string}`;

export const hexToLighterColor = (
  /**
   * hex값으로 된 color
   * @example '#000' '#8989' '#112233' '#11223344'
   */
  hex: HashString,
  /**
   * 0 ~ 1, 투명도 변경 가능 (0에 가까울 수록 더 연한 색)
   * - 0이면 보이지 않음, 1이면 원래 색깔
   * @example 0.1 0.5 0.9
   */
  alpha: number
) => {
  let newHex = hex.replace(/^#/, '');

  if (newHex.length === 3) {
    newHex = newHex[0] + newHex[0] + newHex[1] + newHex[1] + newHex[2] + newHex[2];
  }

  if (newHex.length === 4) {
    newHex =
      newHex[0] + newHex[0] + newHex[1] + newHex[1] + newHex[2] + newHex[2] + newHex[3] + newHex[3];
  }

  if (newHex.length === 6 || newHex.length === 8) {
    const r = parseInt(newHex.substring(0, 2), 16);
    const g = parseInt(newHex.substring(2, 4), 16);
    const b = parseInt(newHex.substring(4, 6), 16);

    const newAlpha = Math.min(1, Math.max(0, alpha));

    return `rgba(${r}, ${g}, ${b}, ${newAlpha})`;
  }

  return hex;
};
