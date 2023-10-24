import { getDeltaAreaState } from './deltaAreaStore';

describe('델타 영역 값에 따라 알맞은 상태를 반환한다.', () => {
  test.each([
    [0.137, 'max'],
    [0.0005, 'large'],
    [0.136, 'large'],
    [0.0000085, 'medium'],
    [0.000144, 'medium'],
    [0.0000084, 'small'],
  ])('getZoomState(%s) returns %s', (zoom, expected) => {
    expect(getDeltaAreaState(zoom)).toBe(expected);
  });
});
