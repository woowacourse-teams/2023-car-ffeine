export interface DeltaAreaBreakpoints {
  small: number;
  medium: number;
  large: number;
}

export type DeltaAreaState = keyof DeltaAreaBreakpoints | 'max';
