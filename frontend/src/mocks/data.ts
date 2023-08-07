import { getTypedObjectFromEntries } from '@utils/getTypedObjectFromEntries';
import { getTypedObjectKeys } from '@utils/getTypedObjectKeys';

import { CHARGER_TYPES, COMPANY_NAME } from '@constants/chargers';
import { ENGLISH_DAYS } from '@constants/congestion';
import { MAX_SEARCH_RESULTS } from '@constants/stationSearch';

import type { MockStation } from '@type';
import type { Capacity, ChargerDetails, ChargerType } from '@type/chargers';
import type { Congestion, CongestionStatistics, EnglishDaysType } from '@type/congestion';
import type { CompanyName } from '@type/stations';

const generateRandomData = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
};

export const generateRandomChargers = () => {
  const length = Math.floor(Math.random() * 10) + 1;
  const chargers: ChargerDetails[] = Array.from({ length }, () => ({
    type: generateRandomData<ChargerType>(getTypedObjectKeys(CHARGER_TYPES)),
    price: generateRandomData([200, 250, 300, 350, 400]),
    capacity: generateRandomData<Capacity>([3, 7, 50, 100, 200]),
    latestUpdateTime: generateRandomData([
      '2016-10-27T17:13:40+00:00',
      '2023-06-27T17:18:40+00:00',
      '2023-07-18T15:11:40+00:00',
      '2023-07-22T15:11:40+00:00',
      '2023-07-28T15:11:40+00:00',
      '2023-07-30T15:11:40+00:00',
    ]),
    state: generateRandomData([
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
    stationName: `잠실의 충전소 ${index}`,
    companyName: generateRandomData<CompanyName>(Object.values(COMPANY_NAME)),
    contact: generateRandomData(['', '010-1234-5678', '02-000-0000']),
    chargers: generateRandomChargers(),
    isParkingFree: generateRandomData<boolean>([true, false]),
    operatingTime: generateRandomData<string>([
      '24시간',
      '09:00 ~ 19:00',
      '평일 09:00~19:00 / 주말 미운영',
    ]),
    address: generateRandomData([
      '서울시 송파구 신천동 7-22',
      '서울시 강남구 테헤란로 411',
      '서울시 종로구 관철동 13-22',
      'null',
    ]),
    detailLocation: generateRandomData<string>(['지상 1층', '지하 1층', '지하 2층', '']),
    latitude: 37 + 9999 * Math.random() * 0.0001,
    longitude: 127 + 9999 * Math.random() * 0.0001,
    isPrivate: generateRandomData<boolean>([true, false]),
    totalCount: generateRandomData<number>([3, 4, 5]),
    availableCount: generateRandomData<number>([0, 1, 2, 3]),
    stationState: generateRandomData(['yyyy-mm-dd일부터 충전소 공사합니다.', 'null', null]),
    privateReason: generateRandomData(['아파트', 'null', null]),
    reportCount: generateRandomData([0, 0, Math.floor(Math.random() * 99)]),
  };
});

export const getSearchedStations = (searchWord: string) => {
  const searchApiStations = stations.map((station) => {
    const { stationId, stationName, chargers, address, latitude, longitude } = station;

    const onlyCapacity = chargers.map(({ capacity }) => capacity);
    const speed = onlyCapacity.map((num) => (num >= 50 ? 'QUICK' : 'STANDARD'));

    return { stationId, stationName, speed, address, latitude, longitude };
  });

  return searchApiStations
    .filter((station) => station.stationName.includes(searchWord))
    .slice(0, MAX_SEARCH_RESULTS);
};

export const getCongestionStatistics = (stationId: number): CongestionStatistics => {
  return {
    stationId,
    congestion: {
      quick: getCongestions(),
      standard: getCongestions(),
    },
  };
};

const getCongestions = (): Record<EnglishDaysType, Congestion[]> => {
  return getTypedObjectFromEntries(
    ENGLISH_DAYS,
    ENGLISH_DAYS.map(() =>
      Array.from({ length: 24 }).map((_, i) => {
        return {
          hour: i,
          ratio: Math.floor(Math.random() * 102 - 1),
        };
      })
    )
  );
};
