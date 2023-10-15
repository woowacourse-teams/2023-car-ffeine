import type { IndexedDBDataType } from '@utils/IndexedDBUtil';
import IndexedDBUtil from '@utils/IndexedDBUtil';
import { getTypedObjectKeys } from '@utils/getTypedObjectKeys';
import { generateRandomData, getRandomTime } from '@utils/randomDataGenerator';

import { COMPANIES, CONNECTOR_TYPES, QUICK_CHARGER_CAPACITY_THRESHOLD } from '@constants/chargers';

import type { Capacity, ChargerDetails, CompanyName, Station } from '@type';
import type { ConnectorTypeKey } from '@type/serverStationFilter';

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

export const generateRandomStationId = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';

  const randomChar = (source: string) => source[Math.floor(Math.random() * source.length)];

  const randomLetter1 = randomChar(letters);
  const randomLetter2 = randomChar(letters);
  const randomNumber = Array.from({ length: 6 }, () => randomChar(numbers)).join('');

  return `${randomLetter1}${randomLetter2}${randomNumber}`;
};

const generateStations = () => {
  return Array.from({ length: 60000 }, () => {
    const randomStationId = generateRandomStationId();
    const chargers = generateRandomChargers();
    const totalCount = chargers.length;
    const availableCount = chargers.filter(({ state }) => state === 'STANDBY').length;
    const quickChargerCount = chargers.filter(
      ({ capacity }) => capacity >= QUICK_CHARGER_CAPACITY_THRESHOLD
    ).length;

    const newStation: Station = {
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

    return newStation;
  });
};

export const stations: Station[] = [];

export const getStations = (() => {
  let stationsData: Station[] | IndexedDBDataType<string, Station[]>[] = null;

  return async () => {
    if (stationsData === null) {
      const dbUtil = new IndexedDBUtil<string, Station[]>('carffeineDB', 1);
      try {
        stationsData = await dbUtil.open().then(() => {
          return dbUtil.getAllData('stations');
        });
        if (stationsData.length === 0) {
          stationsData = generateStations();
        }
      } finally {
        dbUtil.close();
      }
    }
    return stationsData as Station[];
  };
})();
