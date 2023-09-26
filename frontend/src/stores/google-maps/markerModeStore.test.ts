import { getZoomState } from './markerModeStore';

describe('markerModeStore', () => {
  test.each([
    [0, 'country'],
    [7, 'country'],
    [8, 'country'],
    [9, 'country'],
    [11, 'country'],
    [12, 'city'],
    [15, 'city'],
    [16, 'town'],
    [19, 'town'],
    [20, 'town'],
    [21, 'town'],
  ])('getZoomState(%s) returns %s', (zoom, expected) => {
    expect(getZoomState(zoom)).toBe(expected);
  });
});
