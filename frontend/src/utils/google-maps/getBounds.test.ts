import { getBounds } from '@utils/google-maps/getBounds';

import type { DisplayPosition } from '@type';

describe('getBounds를 테스트한다', () => {
  it('displayPosition에 값을 넘기면 Bounds 객체를 반환한다.', () => {
    const displayPosition: DisplayPosition = {
      latitude: 1,
      longitude: 2,
      latitudeDelta: 3,
      longitudeDelta: 4,
      zoom: 5,
    };
    const result = getBounds(displayPosition);
    expect(result).toEqual({
      northEast: {
        latitude: 4,
        longitude: 6,
      },
      southWest: {
        latitude: -2,
        longitude: -2,
      },
    });
  });
});
