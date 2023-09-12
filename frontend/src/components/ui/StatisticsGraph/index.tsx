import CongestionStatisticsSkeleton from '@ui/StationDetailsWindow/congestion/CongestionStatisticsSkeleton';
import type { GraphProps } from '@ui/compound/Graph';
import Graph from '@ui/compound/Graph';
import type { DayMenusProps } from '@ui/compound/Graph/DayMenus';

import type { ENGLISH_DAYS_OF_WEEK_FULL_NAME } from '@constants/congestion';

import type { Congestion } from '@type';

interface StatisticsGraphProps extends GraphProps, Omit<DayMenusProps, 'renderMenuSelectButton'> {
  dayOfWeek: (typeof ENGLISH_DAYS_OF_WEEK_FULL_NAME)[number];
  onChangeDayOfWeek: (dayOfWeek: (typeof ENGLISH_DAYS_OF_WEEK_FULL_NAME)[number]) => void;
  isLoading: boolean;
  statistics: Congestion[];
}

const StatisticsGraph = ({
  statistics,
  align,
  menus,
  onChangeDayOfWeek,
  dayOfWeek,
  isLoading,
}: StatisticsGraphProps) => {
  return (
    <Graph align={align}>
      <Graph.DayMenus
        menus={menus}
        renderMenuSelectButton={(menu: string) => (
          <Graph.CircleDaySelectButton dayOfWeek={dayOfWeek} onChangeDayOfWeek={onChangeDayOfWeek}>
            {menu}
          </Graph.CircleDaySelectButton>
        )}
      />
      {isLoading ? (
        <CongestionStatisticsSkeleton />
      ) : (
        <Graph.BarContainer
          align={align}
          statistics={statistics}
          renderBar={(hour, ratio) => <Graph.Bar hour={hour} ratio={ratio} align={align} />}
        />
      )}
    </Graph>
  );
};

export default StatisticsGraph;
