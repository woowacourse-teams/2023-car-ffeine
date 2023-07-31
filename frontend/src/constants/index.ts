import { getTypedObjectFromEntries } from '@utils/getTypedObjectFromEntries';

import type { EnglishDaysType, KoreanDaysType } from 'types';

export const DEFAULT_CENTER = {
  lat: 37.5056102333107,
  lng: 127.05081496722168,
} as const;

export const INITIAL_ZOOM_SIZE = 14;

export const INVALID_VALUE_LIST = ['null', '.', '..', '1', '#'] as const;

export const DEVELOP_URL = 'http://localhost:8080/api';
export const PRODUCTION_URL = 'http://1.1.1.1:8080/api';

type ModeType = 'development' | 'production';

const URL: Readonly<Record<ModeType, string>> = {
  development: DEVELOP_URL,
  production: PRODUCTION_URL,
};

const MODE = process.env.NODE_ENV as ModeType;
export const BASE_URL = URL[MODE];

const ERROR_PREFIX = '[error]';
export const ERROR_MESSAGES = {
  NO_STATION_FOUND: `${ERROR_PREFIX} 해당 충전소가 존재하지 않습니다.`,
  STATION_DETAILS_FETCH_ERROR: `${ERROR_PREFIX} 충전소 세부 정보를 불러올 수 없습니다.`,
  NO_SEARCH_RESULT: `${ERROR_PREFIX} 검색 결과가 없습니다.`,
} as const;

// 충전기
export const CHARGER_TYPES = {
  DC_FAST: 'DC 차데모',
  AC_SLOW: 'AC 완속',
  DC_AC_3PHASE: 'DC 차데모+AC 3상',
  DC_COMBO: 'DC 콤보',
  DC_DC_COMBO: 'DC 차데모+DC 콤보',
  DC_AC_DC_COMBO: 'DC 차데모+AC 3상+DC 콤보',
  AC_3PHASE: 'AC 3상',
} as const;

/**
 *     충전기상태(1: 통신이상, 2: 충전대기,3: 충전중, 4: 운영중지,5: 점검중, 9: 상태미확인)
 */
export const CHARGER_STATES = {
  COMMUNICATION_ERROR: '통신이상', // 1
  STANDBY: '충전대기', // 2
  CHARGING_IN_PROGRESS: '충전중', // 3
  OPERATION_SUSPENDED: '운영중지', // 4
  UNDER_INSPECTION: '점검중', // 5
  STATUS_UNKNOWN: '상태미확인', // 9
} as const;

export const COMPANY_NAME = {
  AM: '아마노코리아',
  BA: '부안군',
  BG: '비긴스',
  BK: '비케이에너지',
  BN: '블루네트웍스보타리에너지',
  BT: '참빛이브이씨',
  CB: '캐스트프로',
  CP: '한국 EV 충전서비스센터',
  CS: '씨티카',
  CT: '씨어스',
  CU: '대영채비',
  DE: '대구환경공단',
  DG: '대구시',
  DP: '대유플러스',
  E0: '에너지플러스',
  EA: '에바',
  EC: '이지차저',
  EG: '에너지파튼즈',
  EH: '이엔에이치에너지',
  EK: '이노케이텍',
  EM: 'evmost',
  EN: '이엔',
  EP: '이카플러그',
  EV: '에버온',
  EZ: '차지인',
  G1: '광주시',
  G2: '광주시',
  GN: '지커넥트',
  GP: '군포시',
  GS: 'GS 칼텍스',
  HB: '에이치엘비생명과학',
  HD: '현대자동차',
  HE: '한국전기차충전서비스',
  HL: '에이치엘비일렉',
  HM: '휴맥스이브이',
  HS: '홈앤서비스',
  HW: '한화솔루션',
  IK: '익산시',
  JA: '중앙제어',
  JC: '제주에너지공사',
  JD: '제주도청',
  JE: '제주전기자동차서비스',
  JH: '종하아이앤씨',
  JJ: '전주시',
  JN: '제이앤씨플랜',
  JT: '제주테크노파크',
  JU: '정읍시',
  KA: '기아자동차',
  KC: '한국컴퓨터',
  KE: '한국전기차인프라기술',
  KI: '기아자동차',
  KL: '클린일렉스',
  KM: '카카오모빌리티',
  KN: '한국환경공단',
  KO: '이브이파트너스',
  KP: '한국전력',
  KS: '한국전기차솔루션',
  KT: '케이티',
  KU: '한국충전연합',
  LD: '롯데정보통신',
  LH: 'LG 헬로비전',
  MA: '맥플러스',
  ME: '환경부',
  MO: '매니지온',
  MT: '모던텍',
  NB: '남부솔루션',
  NE: '에너넷',
  NJ: '나주시',
  NT: '한국전자금융',
  OB: '현대오일뱅크',
  PC: '파킹클라우드',
  PI: '차지비',
  PL: '플러그링크',
  PS: '이브이파킹서비스',
  PW: '파워큐브',
  RE: '렏이엔지',
  S1: '에스이피',
  SA: '설악에너텍',
  SB: '소프트베리',
  SC: '삼척시',
  SD: '스칼라데이터',
  SE: '서울시',
  SF: '스타코프',
  SG: 'SK 시그넷',
  SJ: '세종시',
  SK: 'SK 에너지',
  SM: '성민기업',
  SN: '서울에너지공사',
  SO: '선광시스템',
  SP: '스마트포트테크놀로지',
  SR: 'SK 렌터카',
  SS: '삼성 EVC',
  ST: '에스트래픽',
  TB: '태백시',
  TD: '타디스테크놀로지',
  TL: '티엘컴퍼니',
  TM: '티맵',
  UN: '유니이브이',
  US: '울산시',
  YY: '양양군',
} as const;

// 충전 속도
export const CAPACITIES = [3, 7, 50, 100, 200] as const;
export const CHARGING_SPEED = {
  QUICK: '급속',
  STANDARD: '완속',
} as const;

// 키
export const LOCAL_STORAGE_KEY_LAST_POSITION = 'CARFFEINE_LAST_POSITION';
export const LOCAL_KEY_GOOGLE_MAPS_API = 'CARFFEINE_GOOGLE_MAPS_API';
export const LOCAL_KEY_GOOGLE_MAPS_API_LAST_LOGIN = 'CARFFEINE_GOOGLE_MAPS_API_LAST_LOGIN';
export const LOCAL_KEY_TOKEN = 'CARFFEINE_TOKEN';

// 날짜
export const KOREAN_DAYS = ['월', '화', '수', '목', '금', '토', '일'] as const;
export const ENGLISH_DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const;

export const KOREAN_DAYS_TO_ENGLISH_DAYS = getTypedObjectFromEntries<
  KoreanDaysType,
  EnglishDaysType
>(KOREAN_DAYS, ENGLISH_DAYS);

// API 검색
export const SEARCH_SCOPE =
  '&scope=stationName&scope=address&scope=speed&scope=latitude&scope=longitude';

export const MAX_SEARCH_RESULTS = 8;
