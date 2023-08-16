import { fetchUtils } from '@utils/fetch';

import { serverStore } from '@stores/config/serverStore';
import { memberInfoStore } from '@stores/login/memberInfoStore';
import { serverStationFilterAction } from '@stores/station-filters/serverStationFiltersStore';

import { SERVERS } from '@constants';

import type { StationFilters } from '@type';
import type { Car } from '@type/cars';

/**
 * 로그인한 member의 차량을 서버에 등록하고, 등록된 차량의 정보를 반환하는 메서드
 *
 * @param carName 차량 이름
 * @param vintage 차량 연식
 * @returns 등록된 member의 차량 정보 { carId, name, vintage }
 */
export const submitMemberCar = async (carName: string, vintage: string): Promise<Car> => {
  const mode = serverStore.getState();
  const memberId = memberInfoStore.getState()?.memberId;

  const memberCarInfo = await fetchUtils.post<Car, Omit<Car, 'carId'>>(
    `${SERVERS[mode]}/members/${memberId}/cars`,
    { name: carName, vintage },
    '차량 정보를 등록하는 중에 오류가 발생했습니다'
  );

  return memberCarInfo;
};

/**
 * 선택한 차량에 해당하는 필터 정보를 반환하는 메서드
 *
 * @param carId 차량 아이디
 * @returns 차량 필터 정보 { companies, capacities, connectorTypes }
 */
export const getCarFilters = async (carId: number): Promise<StationFilters> => {
  const mode = serverStore.getState();

  const carFilters = await fetchUtils.get<StationFilters>(
    `${SERVERS[mode]}/cars/${carId}/filters`,
    '차량 필터 정보를 불러오는 중에 에러가 발생했습니다'
  );

  return carFilters;
};

/**
 * 차량의 필터 정보를 member의 필터 정보에 저장한 후 저장된 모든 필터 정보들을 반환하는 메서드
 *
 * @param carFilters 차량 필터 정보들 { companies, capacities, connectorTypes }
 * @returns member에게 등록된 필터 정보 { companies, capacities, connectorTypes }
 */
export const submitMemberFilters = async (carFilters: StationFilters) => {
  const mode = serverStore.getState();
  const memberId = memberInfoStore.getState()?.memberId;
  const { setAllServerStationFilters, getMemberFilterRequestBody } = serverStationFilterAction;
  setAllServerStationFilters(carFilters);
  const memberFilterRequestBody = getMemberFilterRequestBody();

  const memberFilters = fetchUtils.post<StationFilters, typeof memberFilterRequestBody>(
    `${SERVERS[mode]}/members/${memberId}/filters`,
    memberFilterRequestBody,
    '필터링 정보를 저장하는 중 오류가 발생했습니다'
  );

  return memberFilters;
};
