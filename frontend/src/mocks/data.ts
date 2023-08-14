import { getTypedObjectFromEntries } from '@utils/getTypedObjectFromEntries';
import { getTypedObjectKeys } from '@utils/getTypedObjectKeys';
import {
  generateRandomCommentsLength,
  generateRandomData,
  generateRandomToken,
  getRandomTime,
} from '@utils/randomDataGenerator';

import type { ServerStationFilters } from '@hooks/tanstack-query/station-filters/useServerStationFilters';

import { CONNECTOR_TYPES, COMPANIES, CAPACITIES } from '@constants/chargers';
import { ENGLISH_DAYS } from '@constants/congestion';
import { MAX_SEARCH_RESULTS } from '@constants/stationSearch';

import type { Car } from '@type/cars';
import type { Capacity, ChargerDetails } from '@type/chargers';
import type { Congestion, CongestionStatistics, EnglishDaysType } from '@type/congestion';
import type { CapaCityBigDecimal, ConnectorTypeKey } from '@type/serverStationFilter';
import type { CompanyName, Reply, Review, Station } from '@type/stations';

export const generateRandomChargers = () => {
  const length = Math.floor(Math.random() * 10) + 1;
  const chargers: ChargerDetails[] = Array.from({ length }, () => ({
    type: generateRandomData<ConnectorTypeKey>(getTypedObjectKeys(CONNECTOR_TYPES)),
    price: generateRandomData([200, 250, 300, 350, 400]),
    capacity: generateRandomData<Capacity>([3, 7, 50, 100, 200]),
    latestUpdateTime: getRandomTime(),
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

const generateRandomStationId = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';

  const randomChar = (source: string) => source[Math.floor(Math.random() * source.length)];

  const randomLetter1 = randomChar(letters);
  const randomLetter2 = randomChar(letters);
  const randomNumber = Array.from({ length: 6 }, () => randomChar(numbers)).join('');

  return `${randomLetter1}${randomLetter2}${randomNumber}`;
};

export const stations: Station[] = Array.from({ length: 3000 }, (_, index) => {
  const randomStationId = generateRandomStationId();
  return {
    stationId: randomStationId,
    stationName: `충전소 ${randomStationId}`,
    companyName: generateRandomData<CompanyName>(Object.values(COMPANIES)),
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
    latitude: 37 + 0.25 + 9999 * Math.random() * 0.00005,
    longitude: 127 - 0.25 + 9999 * Math.random() * 0.00005,
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

export const getCongestionStatistics = (stationId: string): CongestionStatistics => {
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
      Array.from({ length: 24 }, (_, index) => {
        return {
          hour: index,
          ratio: Math.floor(Math.random() * 102 - 1),
        };
      })
    )
  );
};

export const generateReviews = (): Review[] => {
  return Array.from({ length: 10 }, (_, index) => {
    return {
      reviewId: index,
      memberId: generateRandomToken(),
      latestUpdateDate: getRandomTime(),
      ratings: Math.floor(Math.random() * 5) + 1,
      content: generateRandomData([
        '정말 멋진 충전소네요.',
        '고장이 잘나요',
        '주차 공간이 너무 좁아요',
        '후면 주차가 어려워요',
        '손잡이가 드러워요',
        '비매너 사용자들이 많아요',
        '자리가 넉넉해요',
        '비매너 사용자들이 많아요비매너 사용자들이 많아요비매너 사용자들이 많아요비매너 사용자들이 많아요비매너 사용자들이 많아요비매너 사용자들이 많아요',
      ]),
      isUpdated: generateRandomData([true, false]),
      isDeleted: generateRandomData([true, false]),
      replySize: generateRandomData([0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7]),
    };
  });
};

export const generateReplies = (): Reply[] => {
  return Array.from({ length: 10 }, (_, index) => {
    return {
      replyId: index,
      reviewId: generateRandomToken(),
      memberId: generateRandomToken(),
      latestUpdateDate: getRandomTime(),
      content: generateRandomData([
        '정말 멋진 충전소네요.',
        '고장이 잘나요',
        '주차 공간이 너무 좁아요',
        '후면 주차가 어려워요',
        '손잡이가 드러워요',
        '비매너 사용자들이 많아요',
        '자리가 넉넉해요',
        '비매너 사용자들이 많아요비매너 사용자들이 많아요비매너 사용자들이 많아요비매너 사용자들이 많아요비매너 사용자들이 많아요비매너 사용자들이 많아요',
      ]),
      isUpdated: generateRandomData([true, false]),
      isDeleted: generateRandomData([true, false]),
    };
  });
};

export const generateCars = (): Car[] => {
  const name = Array.from({ length: 6 }).map((_, i) => `아이오닉${i + 1}`);
  const vintage = Array.from({ length: 5 }).map((_, i) => `${2019 + i}`);

  const car = name
    .map((n) => {
      const randomLength = Math.floor(Math.random() * 4) + 1;

      const randomYear = vintage.slice(0, randomLength);
      return randomYear.map((rV) => ({
        carId: Math.random(),
        name: n,
        vintage: rV,
      }));
    })
    .reduce((acc, curr) => [...acc, ...curr], []);

  return car;
};

export const generateCarFilters = (): Omit<ServerStationFilters, 'companies'> => {
  const randomSortedCapacities = (
    [...CAPACITIES.map((capacity) => `${capacity}.00`)] as CapaCityBigDecimal[]
  ).sort(() => (Math.random() - 0.5 > 0 ? 1 : -1));
  const randomSortedConnectorTypes = [...getTypedObjectKeys(CONNECTOR_TYPES)].sort(() =>
    Math.random() - 0.5 > 0 ? 1 : -1
  );

  const capacities = randomSortedCapacities.slice(
    0,
    Math.floor(Math.random() * (randomSortedCapacities.length - 1) + 1)
  );
  const connectorTypes = randomSortedConnectorTypes.slice(0, 3);

  return {
    capacities,
    connectorTypes,
  };
};
