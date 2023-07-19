import { store } from '@utils/external-state';

interface StationFilter {
  isShowingFastChargeStationOnly: boolean;
  isShowingAvailableStationOnly: boolean;
  isShowingParkingFreeStationOnly: boolean;
}

export const stationFilterStore = store<StationFilter>({
  isShowingAvailableStationOnly: false,
  isShowingFastChargeStationOnly: false,
  isShowingParkingFreeStationOnly: false,
});
