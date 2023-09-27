import { getZoomState, ZoomState } from './zoomStore';

describe('markerModeStore', () => {
  test.each([
    [8, ZoomState.country],
    [11, ZoomState.country],
    [12, ZoomState.city],
    [15, ZoomState.city],
    [16, ZoomState.town],
    [20, ZoomState.town],
  ])('getZoomState(%s) returns %s', (zoom, expected) => {
    expect(getZoomState(zoom)).toBe(expected);
  });
});
