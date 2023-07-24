import type { CapacityType, ChargerDetails, MockStation } from '../types';

const generateRandomData = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
};

const generateRandomChargers = () => {
  const length = Math.floor(Math.random() * 4) + 1;
  const chargers: ChargerDetails[] = Array.from({ length }, () => ({
    type: generateRandomData<string>(['DC콤보', 'DC차데모']),
    price: generateRandomData([200, 250, 300, 350, 400]),
    capacity: generateRandomData<CapacityType>([3, 7, 50, 100, 200]),
    latestUpdateTime: generateRandomData([
      new Date('2016-10-27T17:13:40+00:00'),
      new Date('2023-06-27T17:18:40+00:00'),
      new Date('2023-07-18T15:11:40+00:00'),
      null,
    ]),
    state: generateRandomData([
      'AVAILABLE',
      'COMMUNICATION_ERROR',
      'STANDBY',
      'CHARGING_IN_PROGRESS',
      'OPERATION_SUSPENDED',
      'UNDER_INSPECTION',
      'STATUS_UNKNOWN',
    ]),
    method: generateRandomData(['단독', '동시']),
  }));

  return chargers;
};

export const stations: MockStation[] = Array.from({ length: 3000 }).map((_, index) => {
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
    contact: generateRandomData(['', '010-1234-5678', '02-000-0000']),
    chargers: generateRandomChargers(),
    isParkingFree: generateRandomData<boolean>([true, false]),
    operatingTime: generateRandomData<string>([
      '24시간',
      '09:00 ~ 19:00',
      '평일 09:00~19:00 / 주말 미운영',
    ]),
    address: generateRandomData(['동대문', '수유역', '선릉점']),
    detailLocation: generateRandomData<string>(['지상 1층', '지하 1층', '지하 2층', '']),
    latitude: 37 + 9999 * Math.random() * 0.0001,
    longitude: 127 + 9999 * Math.random() * 0.0001,
    isPrivate: generateRandomData<boolean>([true, false]),
    totalCount: generateRandomData<number>([3, 4, 5]),
    availableCount: generateRandomData<number>([0, 1, 2, 3]),
    stationState: generateRandomData(['yyyy-mm-dd일부터 충전소 공사합니다.', null]),
    privateReason: generateRandomData(['아파트', null]),
  };
});
