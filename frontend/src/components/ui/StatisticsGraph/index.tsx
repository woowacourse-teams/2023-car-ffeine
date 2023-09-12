import type { GraphProps } from '@ui/compound/Graph';
import Graph from '@ui/compound/Graph';
import type { DayMenusProps } from '@ui/compound/Graph/DayMenus';

import type { ENGLISH_DAYS_OF_WEEK_FULL_NAME } from '@constants/congestion';

interface StatisticsGraphProps extends GraphProps, Omit<DayMenusProps, 'renderMenuSelectButton'> {
  dayOfWeek: (typeof ENGLISH_DAYS_OF_WEEK_FULL_NAME)[number];
  onChangeDayOfWeek: (dayOfWeek: (typeof ENGLISH_DAYS_OF_WEEK_FULL_NAME)[number]) => void;
}

const StatisticsGraph = ({
  statistics,
  align,
  menus,
  onChangeDayOfWeek,
  dayOfWeek,
}: StatisticsGraphProps) => {
  return (
    <Graph statistics={statistics} align={align}>
      <Graph.DayMenus
        statistics={statistics}
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
      />
    </Graph>
  );
};

export default StatisticsGraph;
