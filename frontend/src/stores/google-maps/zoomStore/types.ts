export interface ZoomBreakpoints {
  low: number;
  middle: number;
  high: number;
  max: number;
}

export type ZoomState = keyof ZoomBreakpoints;
