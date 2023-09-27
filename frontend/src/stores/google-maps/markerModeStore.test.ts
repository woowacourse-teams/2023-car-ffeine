import { ZOOM_STATE } from '../../constants/googleMaps';
import { getZoomState } from './markerModeStore';

describe('markerModeStore', () => {
  test.each([
    [8, ZOOM_STATE.country],
    [11, ZOOM_STATE.country],
    [12, ZOOM_STATE.city],
    [15, ZOOM_STATE.city],
    [16, ZOOM_STATE.town],
    [20, ZOOM_STATE.town],
  ])('getZoomState(%s) returns %s', (zoom, expected) => {
    expect(getZoomState(zoom)).toBe(expected);
  });
});
