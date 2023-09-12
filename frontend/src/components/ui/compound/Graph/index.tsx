import type { PropsWithChildren } from 'react';

import FlexBox from '@common/FlexBox';

import Bar from './Bar';
import BarContainer from './BarContainer';
import CircleDaySelectButton from './CircleDaySelectButton';
import DayMenus from './DayMenus';

export interface GraphProps {
  align: 'row' | 'column';
}

const Graph = ({ children }: PropsWithChildren<GraphProps>) => {
  return (
    <FlexBox direction="column" gap={3} width="100%">
      {children}
    </FlexBox>
  );
};

Graph.DayMenus = DayMenus;
Graph.CircleDaySelectButton = CircleDaySelectButton;
Graph.BarContainer = BarContainer;
Graph.Bar = Bar;

export default Graph;
