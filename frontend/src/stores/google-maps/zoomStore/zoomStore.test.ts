import { getZoomState } from './zoomStore';

describe('markerModeStore', () => {
  test.each([
    [8, 'low'],
    [11, 'low'],
    [12, 'middle'],
    [15, 'middle'],
    [16, 'high'],
    [20, 'high'],
  ])('getZoomState(%s) returns %s', (zoom, expected) => {
    expect(getZoomState(zoom)).toBe(expected);
  });
});
