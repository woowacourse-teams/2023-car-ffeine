export interface ZoomBreakpoints {
  low: number;
  middle: number;
  high: number;
}

export type ZoomState = keyof ZoomBreakpoints;
