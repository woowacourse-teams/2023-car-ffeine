import { QUICK_CHARGER_CAPACITY_THRESHOLD } from '@constants/chargers';

import type { StationDetails, StationSummary } from '@type';

export const convertStationDetailsToSummary = (stationDetails: StationDetails): StationSummary => {
  const {
    address,
    companyName,
    detailLocation,
    isParkingFree,
    isPrivate,
    latitude,
    longitude,
    operatingTime,
    stationId,
    stationName,
    chargers,
  } = stationDetails;

  const availableCount = chargers.filter((charger) => charger.state === 'STANDBY').length;
  const totalCount = chargers.length;
  const quickChargerCount = chargers.filter(
    (charger) => charger.capacity > QUICK_CHARGER_CAPACITY_THRESHOLD
  ).length;

  return {
    address,
    companyName,
    detailLocation,
    isParkingFree,
    isPrivate,
    latitude,
    longitude,
    operatingTime,
    stationId,
    stationName,
    availableCount,
    totalCount,
    quickChargerCount,
  };
};
