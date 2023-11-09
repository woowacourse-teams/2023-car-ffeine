import { QUICK_CHARGER_CAPACITY_THRESHOLD } from '@constants/chargers';

import type { Charger } from '@type';

export const getChargerCountsAndAvailability = (chargers: Charger[]) => {
  const isAvailable = chargers.some(({ state }) => state === 'STANDBY');

  const standardChargers = chargers.filter(
    ({ capacity }) => capacity < QUICK_CHARGER_CAPACITY_THRESHOLD
  );
  const quickChargers = chargers.filter(
    ({ capacity }) => capacity >= QUICK_CHARGER_CAPACITY_THRESHOLD
  );

  const availableStandardChargerCount = standardChargers.filter(
    ({ state }) => state === 'STANDBY'
  ).length;
  const availableQuickChargerCount = quickChargers.filter(
    ({ state }) => state === 'STANDBY'
  ).length;
  const availableCount = availableStandardChargerCount + availableQuickChargerCount;

  const standardChargerCount = standardChargers.length;
  const quickChargerCount = quickChargers.length;

  return {
    isAvailable,
    availableStandardChargerCount,
    availableQuickChargerCount,
    standardChargerCount,
    quickChargerCount,
    availableCount,
  };
};
