import type { GraphProps } from 'components/ui/StatisticsGraph/Graph';
import Graph from 'components/ui/StatisticsGraph/Graph';

import type { DayMenusProps } from '@ui/StatisticsGraph/Graph/DayMenus';

import type { Congestion, EnglishDaysOfWeek } from '@type';

interface Props extends GraphProps, Omit<DayMenusProps, 'renderMenuSelectButton'> {
  dayOfWeek: EnglishDaysOfWeek;
  onChangeDayOfWeek: (dayOfWeek: EnglishDaysOfWeek) => void;
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
      <Graph.BarContainer
        align={align}
        statistics={statistics}
        renderBar={(hour, ratio) => <Graph.Bar hour={hour} ratio={ratio} align={align} />}
        isLoading={isLoading}
      />
    </Graph>
  );
};

export default StatisticsGraph;
