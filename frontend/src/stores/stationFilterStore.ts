import { store } from '@utils/external-state';

interface StationFilter {
  showFasterChargeStationOnly: boolean;
  showAvailableStationOnly: boolean;
  showParkingFreeStationOnly: boolean;
}

export const stationFilterStore = store<StationFilter>({
  showAvailableStationOnly: false,
  showFasterChargeStationOnly: false,
  showParkingFreeStationOnly: false,
});
