import { stations } from '@mocks/data/stations';

import { QUICK_CHARGER_CAPACITY_THRESHOLD } from '@constants/chargers';
import { MAX_SEARCH_RESULTS } from '@constants/stationSearch';

export const getSearchedStations = (searchWord: string) => {
  const searchApiStations = stations.map((station) => {
    const { stationId, stationName, chargers, address, latitude, longitude } = station;

    const speed = chargers.map(({ capacity }) =>
      capacity >= QUICK_CHARGER_CAPACITY_THRESHOLD ? 'QUICK' : 'STANDARD'
    );

    return { stationId, stationName, speed, address, latitude, longitude };
  });

  return searchApiStations
    .filter(
      (station) => station.stationName.includes(searchWord) || station.address.includes(searchWord)
    )
    .slice(0, MAX_SEARCH_RESULTS);
};

export const getCities = () => {
  return [
    {
      cityName: '서울특별시',
      latitude: 37.5666103,
      longitude: 126.9783882,
    },
    {
      cityName: '서울특별시 강동구',
      latitude: 37.530126,
      longitude: 127.1237708,
    },
    {
      cityName: '서울특별시 강동구 천호동',
      latitude: 37.5450159,
      longitude: 127.1368066,
    },
    {
      cityName: '경기도 하남시 미사동',
      latitude: 37.560359,
      longitude: 127.1888042,
    },
    {
      cityName: '경기도 하남시 망월동',
      latitude: 37.5696083,
      longitude: 127.1880625,
    },
    {
      cityName: '경상남도 진주시 신안동',
      latitude: 35.1844853,
      longitude: 128.0689824,
    },
    {
      cityName: '경상남도 진주시',
      latitude: 35.180325,
      longitude: 128.107646,
    },
    {
      cityName: '경기도 안산시 단원구 선부동',
      latitude: 37.3342173,
      longitude: 126.8044133,
    },
    {
      cityName: '경기도 오산시 부산동',
      latitude: 37.1527237,
      longitude: 127.088125,
    },
    {
      cityName: '부산광역시',
      latitude: 35.179816,
      longitude: 129.0750223,
    },
    {
      cityName: '부산광역시 기장군',
      latitude: 35.244498,
      longitude: 129.222312,
    },
    {
      cityName: '부산광역시 기장군 철마면',
      latitude: 35.2752833,
      longitude: 129.1497125,
    },
  ];
};
