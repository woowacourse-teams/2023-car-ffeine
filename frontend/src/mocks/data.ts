import type { CapacityType, Charger, ChargerType, Station } from '../types';

const generateRandomData = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
};

const generateRandomChargers = () => {
  const length = Math.floor(Math.random() * 4) + 1;
  const chargers: Charger[] = Array.from({ length }, () => ({
    type: generateRandomData<ChargerType>(['완속', '급속']),
    price: generateRandomData([200, 250, 300, 350, 400]),
    capacity: generateRandomData<CapacityType>([3, 7, 50, 100, 200]),
  }));

  return chargers;
};

export const stations: Station[] = Array.from({ length: 3000 }).map((_, index) => {
  return {
    stationId: index,
    stationName: `충전소 ${index}`,
    companyName: generateRandomData<string>([
      '파워큐브',
      '에버온',
      '환경부',
      '한국전력',
      '티비유',
      '플러그링크',
    ]),
    chargers: generateRandomChargers(),
    isParkingFree: generateRandomData<boolean>([true, false]),
    operatingTime: generateRandomData<string>([
      '24시간',
      '09:00 ~ 19:00',
      '평일 09:00~19:00 / 주말 미운영',
    ]),
    detailLocation: generateRandomData<string>(['지상 1층', '지하 1층', '지하 2층', '']),
    latitude: 37 + 9999 * Math.random() * 0.0001,
    longitude: 127 + 9999 * Math.random() * 0.0001,
    isPrivate: generateRandomData<boolean>([true, false]),
    totalCount: generateRandomData<number>([3, 4, 5]), // 전체 충전기 갯수
    availableCount: generateRandomData<number>([1, 2, 3]), // 사용가능한 충전기 갯수
  };
});
