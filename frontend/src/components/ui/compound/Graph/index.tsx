import type { PropsWithChildren } from 'react';
import { useState, createContext } from 'react';

import FlexBox from '@common/FlexBox';

import type { Congestion, EnglishDaysType } from '@type/congestion';

import Bar from './Bar';
import BarContainer from './BarContainer';
import CircleDaySelectButton from './CircleDaySelectButton';
import DayMenus from './DayMenus';

export interface GraphProps {
  align: 'row' | 'column';
  statistics: Record<EnglishDaysType, Congestion[]>;
}

interface GraphContextType {
  congestionStatistics: Record<EnglishDaysType, Congestion[]>;
  setCongestionStatistics: (congestionStatistics: Record<EnglishDaysType, Congestion[]>) => void;
  selectedDay: EnglishDaysType;
  setSelectedDay: (selectedDays: EnglishDaysType) => void;
}

export const GraphContext = createContext<GraphContextType>(null);

const Graph = ({ statistics, children }: PropsWithChildren<GraphProps>) => {
  const [congestionStatistics, setCongestionStatistics] = useState(statistics);
  const [selectedDay, setSelectedDay] = useState<EnglishDaysType>('MON');

  return (
    <GraphContext.Provider
      value={{ congestionStatistics, setCongestionStatistics, selectedDay, setSelectedDay }}
    >
      <FlexBox direction="column" gap={5}>
        {children}
      </FlexBox>
    </GraphContext.Provider>
  );
};

Graph.DayMenus = DayMenus;
Graph.CircleDaySelectButton = CircleDaySelectButton;
Graph.BarContainer = BarContainer;
Graph.Bar = Bar;

export default Graph;
