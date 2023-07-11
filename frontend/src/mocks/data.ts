import type { Station } from '../types';

export const stations: Station[] = Array.from({ length: 3000 }).map((_, index) => {
  return {
    stationId: index,
    stationName: `충전소 ${index}`,
    companyName: '충전소 회사',
    chargers: [
      {
        type: '완속',
        price: 100,
        capacity: 20,
      },
    ],
    isParkingFree: true,
    operatingTime: '24시간',
    detailLocation: '더미데이터',
    latitude: 37 + 9999 * Math.random() * 0.0001,
    longitude: 127 + 9999 * Math.random() * 0.0001,
    isPrivate: false,
    totalCount: 10, // 전체 충전기 갯수
    availableCount: 1, // 사용가능한 충전기 갯수
  };
});
