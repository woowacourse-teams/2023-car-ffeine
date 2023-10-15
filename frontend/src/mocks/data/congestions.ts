import { getTypedObjectFromEntries } from '@utils/getTypedObjectFromEntries';

import { QUICK_CHARGER_CAPACITY_THRESHOLD } from '@constants/chargers';
import { NO_RATIO, SHORT_ENGLISH_DAYS_OF_WEEK } from '@constants/congestion';

import type { Congestion, ShortEnglishDaysOfWeek, Station } from '@type';

export interface CongestionStatisticsMockData {
  stationId: string;
  congestion: {
    standard: Record<ShortEnglishDaysOfWeek, Congestion[]>;
    quick: Record<ShortEnglishDaysOfWeek, Congestion[]>;
  };
}

export const getCongestionStatistics = (
  stations: Station[],
  stationId: string
): CongestionStatisticsMockData => {
  const foundStation = stations.find((station) => station.stationId === stationId);
  const hasOnlyStandardChargers = foundStation.quickChargerCount === 0;
  const hasOnlyQuickChargers = foundStation.chargers.every(
    ({ capacity }) => capacity >= QUICK_CHARGER_CAPACITY_THRESHOLD
  );

  return {
    stationId: foundStation.stationId,
    congestion: {
      quick: getCongestions(hasOnlyStandardChargers),
      standard: getCongestions(hasOnlyQuickChargers),
    },
  };
};

const getCongestions = (
  hasOnlyOneChargerType: boolean
): Record<ShortEnglishDaysOfWeek, Congestion[]> => {
  return getTypedObjectFromEntries(
    SHORT_ENGLISH_DAYS_OF_WEEK,
    SHORT_ENGLISH_DAYS_OF_WEEK.map(() =>
      Array.from({ length: 24 }, (_, index) => {
        return {
          hour: index,
          ratio: hasOnlyOneChargerType || Math.random() > 0.95 ? NO_RATIO : Math.random(),
        };
      })
    )
  );
};
