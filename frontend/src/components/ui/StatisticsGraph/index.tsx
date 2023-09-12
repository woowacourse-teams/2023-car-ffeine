import CongestionBarContainerSkeleton from '@ui/StationDetailsWindow/congestion/CongestionBarContainerSkeleton';
import type { GraphProps } from '@ui/compound/Graph';
import Graph from '@ui/compound/Graph';
import type { DayMenusProps } from '@ui/compound/Graph/DayMenus';

import type { Congestion, EnglishDaysOfWeekLongName } from '@type';

interface Props extends GraphProps, Omit<DayMenusProps, 'renderMenuSelectButton'> {
  dayOfWeek: EnglishDaysOfWeekLongName;
  onChangeDayOfWeek: (dayOfWeek: EnglishDaysOfWeekLongName) => void;
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
}: Props) => {
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
        <CongestionBarContainerSkeleton />
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
