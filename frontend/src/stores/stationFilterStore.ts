import { store } from '@utils/external-state';

interface StationFilter {
  isFastChargeStationFilterSelected: boolean;
  isAvailableStationFilterSelected: boolean;
  isParkingFreeStationFilterSelected: boolean;
  isPrivateStationFilterSelected: boolean;
}

export const stationFilterStore = store<StationFilter>({
  isAvailableStationFilterSelected: false,
  isFastChargeStationFilterSelected: false,
  isParkingFreeStationFilterSelected: false,
  isPrivateStationFilterSelected: false,
});
