import { isBoundsWithinCachedBounds } from '@utils/google-maps/isCachedRegion';

describe('isCachedRegion을 테스트합니다.', () => {
  it('새로운 범위가 캐시된 범위 이내입니다.', () => {
    const cachedBounds = {
      northEast: {
        latitude: 1,
        longitude: 1,
      },
      southWest: {
        latitude: 0,
        longitude: 0,
      },
    };
    const bounds = {
      northEast: {
        latitude: 0.5,
        longitude: 0.5,
      },
      southWest: {
        latitude: 0,
        longitude: 0,
      },
    };

    expect(isBoundsWithinCachedBounds(cachedBounds, bounds)).toBe(true);
  });
  it('새로운 범위가 캐시된 범위 이내가 아닙니다.', () => {
    const cachedBounds = {
      northEast: {
        latitude: 1,
        longitude: 1,
      },
      southWest: {
        latitude: 0,
        longitude: 0,
      },
    };
    const bounds = {
      northEast: {
        latitude: 2,
        longitude: 2,
      },
      southWest: {
        latitude: 1,
        longitude: 1,
      },
    };

    expect(isBoundsWithinCachedBounds(cachedBounds, bounds)).toBe(false);
  });
});
