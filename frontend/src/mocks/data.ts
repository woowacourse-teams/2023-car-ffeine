import type { RegionCount, RegionName } from '@marker/LowZoomMarkerContainer/types';

import { getTypedObjectFromEntries } from '@utils/getTypedObjectFromEntries';
import { getTypedObjectKeys } from '@utils/getTypedObjectKeys';
import { generateRandomData, generateRandomToken, getRandomTime } from '@utils/randomDataGenerator';

import {
  CAPACITIES,
  COMPANIES,
  CONNECTOR_TYPES,
  QUICK_CHARGER_CAPACITY_THRESHOLD,
} from '@constants/chargers';
import { NO_RATIO, SHORT_ENGLISH_DAYS_OF_WEEK } from '@constants/congestion';
import { MAX_SEARCH_RESULTS } from '@constants/stationSearch';

import type { Car } from '@type/cars';
import type { Capacity, ChargerDetails } from '@type/chargers';
import type { Congestion, ShortEnglishDaysOfWeek } from '@type/congestion';
import type { CapaCityBigDecimal, ConnectorTypeKey } from '@type/serverStationFilter';
import type { CompanyName, Reply, Review, Station, StationFilters } from '@type/stations';

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

export const stations: Station[] = Array.from({ length: 60000 }, () => {
  const randomStationId = generateRandomStationId();
  const chargers = generateRandomChargers();
  const totalCount = chargers.length;
  const availableCount = chargers.filter(({ state }) => state === 'STANDBY').length;
  const quickChargerCount = chargers.filter(
    ({ capacity }) => capacity >= QUICK_CHARGER_CAPACITY_THRESHOLD
  ).length;

  return {
    stationId: randomStationId,
    stationName: `충전소 ${randomStationId}`,
    companyName: generateRandomData<CompanyName>(Object.values(COMPANIES)),
    contact: generateRandomData(['', '010-1234-5678', '02-000-0000']),
    chargers: chargers,
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
    totalCount,
    availableCount,
    quickChargerCount,
    stationState: generateRandomData(['yyyy-mm-dd일부터 충전소 공사합니다.', 'null', null]),
    privateReason: generateRandomData(['아파트', 'null', null]),
    reportCount: generateRandomData([0, 0, Math.floor(Math.random() * 99)]),
  };
});

export const getSearchedStations = (searchWord: string) => {
  const searchApiStations = stations.map((station) => {
    const { stationId, stationName, chargers, address, latitude, longitude } = station;

    const onlyCapacity = chargers.map(({ capacity }) => capacity);
    const speed = onlyCapacity.map((num) =>
      num >= QUICK_CHARGER_CAPACITY_THRESHOLD ? 'QUICK' : 'STANDARD'
    );

    return { stationId, stationName, speed, address, latitude, longitude };
  });

  return searchApiStations
    .filter((station) => station.stationName.includes(searchWord))
    .slice(0, MAX_SEARCH_RESULTS);
};

interface CongestionStatisticsMockData {
  stationId: string;
  congestion: {
    standard: Record<ShortEnglishDaysOfWeek, Congestion[]>;
    quick: Record<ShortEnglishDaysOfWeek, Congestion[]>;
  };
}

export const getCongestionStatistics = (stationId: string): CongestionStatisticsMockData => {
  const foundStation = stations.find((station) => station.stationId === stationId);
  const hasOnlyStandardChargers = foundStation.quickChargerCount === 0;
  const hasOnlyQuickChargers = foundStation.chargers.every(
    ({ capacity }) => capacity >= QUICK_CHARGER_CAPACITY_THRESHOLD
  );

  return {
    stationId: foundStation.stationId,
    congestion: {
      quick: getCongestions(hasOnlyStandardChargers),
      standard: getCongestions(hasOnlyQuickChargers),
    },
  };
};

const getCongestions = (
  hasOnlyOneChargerType: boolean
): Record<ShortEnglishDaysOfWeek, Congestion[]> => {
  return getTypedObjectFromEntries(
    SHORT_ENGLISH_DAYS_OF_WEEK,
    SHORT_ENGLISH_DAYS_OF_WEEK.map(() =>
      Array.from({ length: 24 }, (_, index) => {
        return {
          hour: index,
          ratio: hasOnlyOneChargerType || Math.random() > 0.95 ? NO_RATIO : Math.random(),
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

export const generateCarFilters = (): StationFilters => {
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
    companies: [],
    capacities,
    connectorTypes,
  };
};

export const regionCounts: RegionCount[] = [
  {
    regionName: '서울특별시',
    latitude: 37.540705,
    longitude: 126.956764,
    count: 8128,
  },
  {
    regionName: '인천광역시',
    latitude: 37.469221,
    longitude: 126.573234,
    count: 2665,
  },
  {
    regionName: '광주광역시',
    latitude: 35.126033,
    longitude: 126.831302,
    count: 2155,
  },
  {
    regionName: '대구광역시',
    latitude: 35.798838,
    longitude: 128.583052,
    count: 2871,
  },
  {
    regionName: '울산광역시',
    latitude: 35.519301,
    longitude: 129.239078,
    count: 1238,
  },
  {
    regionName: '대전광역시',
    latitude: 36.321655,
    longitude: 127.378953,
    count: 1783,
  },
  {
    regionName: '부산광역시',
    latitude: 35.198362,
    longitude: 129.053922,
    count: 3337,
  },
  {
    regionName: '경기도',
    latitude: 37.567167,
    longitude: 127.190292,
    count: 14710,
  },
  {
    regionName: '강원특별자치도',
    latitude: 37.555837,
    longitude: 128.209315,
    count: 2918,
  },
  {
    regionName: '충청남도',
    latitude: 36.557229,
    longitude: 126.779757,
    count: 3191,
  },
  {
    regionName: '충청북도',
    latitude: 36.628503,
    longitude: 127.929344,
    count: 2283,
  },
  {
    regionName: '경상북도',
    latitude: 36.248647,
    longitude: 128.664734,
    count: 3805,
  },
  {
    regionName: '경상남도',
    latitude: 35.259787,
    longitude: 128.664734,
    count: 3869,
  },
  {
    regionName: '전라북도',
    latitude: 35.716705,
    longitude: 127.144185,
    count: 2938,
  },
  {
    regionName: '전라남도',
    latitude: 34.8194,
    longitude: 126.893113,
    count: 2873,
  },
  {
    regionName: '제주특별자치도',
    latitude: 33.364805,
    longitude: 126.542671,
    count: 2942,
  },
];

export const getRegionName = (regionName: string): RegionName | undefined => {
  switch (regionName) {
    case 'SEOUL':
      return '서울특별시';
    case 'INCHEON':
      return '인천광역시';
    case 'GWANGJU':
      return '광주광역시';
    case 'DAEGU':
      return '대구광역시';
    case 'ULSAN':
      return '울산광역시';
    case 'DAEJEON':
      return '대전광역시';
    case 'BUSAN':
      return '부산광역시';
    case 'GYEONGGI':
      return '경기도';
    case 'GANGWON':
      return '강원특별자치도';
    case 'CHUNGNAM':
      return '충청남도';
    case 'CHUNGBUK':
      return '충청북도';
    case 'GYEONGBUK':
      return '경상북도';
    case 'GYEONGNAM':
      return '경상남도';
    case 'JEONBUK':
      return '전라북도';
    case 'JEONNAM':
      return '전라남도';
    case 'JEJU':
      return '제주특별자치도';
    default:
      return undefined;
  }
};
