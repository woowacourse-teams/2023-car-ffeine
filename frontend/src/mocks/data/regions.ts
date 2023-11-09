import type { Region, RegionName } from '@marker/components/MaxDeltaAreaMarkerContainer/types';

export const regions: Region[] = [
  {
    regionName: '서울특별시',
    latitude: 37.540705,
    longitude: 126.956764,
    count: 8128,
  },
  {
    regionName: '인천광역시',
    latitude: 37.3865,
    longitude: 126.647,
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
    latitude: 37.2895,
    longitude: 127.0535,
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
