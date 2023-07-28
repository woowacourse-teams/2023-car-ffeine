import { useEffect, type PropsWithChildren } from 'react';

import { useSetExternalState } from '@utils/external-state';

import FlexBox from '@common/FlexBox';

import Bar from './Bar';
import BarContainer from './BarContainer';
import CircleDaySelectButton from './CircleDaySelectButton';
import DayMenus from './DayMenus';
import { congestionStatisticsStore } from './GraphStore';

import type { Congestion, EnglishDaysType } from 'types';

export interface GraphProps {
  align: 'row' | 'column';
  statistics: Record<EnglishDaysType, Congestion[]>;
}

const Graph = ({ statistics, children }: PropsWithChildren<GraphProps>) => {
  const setStatistics = useSetExternalState(congestionStatisticsStore);

  useEffect(() => {
    setStatistics(statistics);
  }, []);

  return (
    <FlexBox direction="column" gap={5}>
      {children}
    </FlexBox>
  );
};

Graph.DayMenus = DayMenus;
Graph.CircleDaySelectButton = CircleDaySelectButton;
Graph.BarContainer = BarContainer;
Graph.Bar = Bar;

export default Graph;
