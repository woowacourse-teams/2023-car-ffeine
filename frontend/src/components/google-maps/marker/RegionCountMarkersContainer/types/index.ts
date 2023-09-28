export type RegionName =
  | '서울특별시'
  | '인천광역시'
  | '광주광역시'
  | '대구광역시'
  | '울산광역시'
  | '대전광역시'
  | '부산광역시'
  | '경기도'
  | '강원특별자치도'
  | '충청남도'
  | '충청북도'
  | '경상북도'
  | '경상남도'
  | '전라북도'
  | '전라남도'
  | '제주특별자치도';

export interface RegionCount {
  regionName: RegionName;
  latitude: number;
  longitude: number;
  count: number;
}
