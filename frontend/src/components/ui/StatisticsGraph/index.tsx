import type { GraphProps } from "@ui/compound/Graph";
import Graph from "@ui/compound/Graph";
import type { DayMenusProps } from "@ui/compound/Graph/DayMenus";


interface StatisticsGraphProps extends GraphProps, Omit<DayMenusProps, 'renderMenuSelectButton'> {}

const StatisticsGraph = ({ statistics, align, menus }: StatisticsGraphProps) => {
  return (
    <Graph statistics={statistics} align={align}>
      <Graph.DayMenus
        statistics={statistics}
        menus={menus}
        renderMenuSelectButton={(menu: string) => (
          <Graph.CircleDaySelectButton>{menu}</Graph.CircleDaySelectButton>
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
