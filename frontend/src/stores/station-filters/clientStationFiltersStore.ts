import { store } from '@utils/external-state';

import { CHARGING_SPEED } from '../../constants/chargers';

const initialClientStationFilter = {
  availableStationFilter: { isAvailable: false, label: '현재 사용 가능' },
  fastChargeStationFilter: { isAvailable: false, label: CHARGING_SPEED.quick },
  parkingFreeStationFilter: { isAvailable: false, label: '주차 무료' },
  privateStationFilter: { isAvailable: false, label: '외부인 개방' },
};

export type ClientStationFilter = typeof initialClientStationFilter;

export const clientStationFiltersStore = store<ClientStationFilter>({
  ...initialClientStationFilter,
});
