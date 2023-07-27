import { css } from 'styled-components';

import FlexBox from '@common/FlexBox';

import { DAY_KOR } from '@constants';

import DaySelectButton from './DaySelectButton';
import GraphBar from './GraphBar';

import type { CongestionStatistics } from 'types';

interface Props {
  statistics: CongestionStatistics;
}

const StatisticsGraph = ({ statistics }: Props) => {
  return (
    <FlexBox direction="column" gap={3}>
      <FlexBox>
        {DAY_KOR.map((day, index) => (
          <DaySelectButton key={index} day={day} />
        ))}
      </FlexBox>
      <FlexBox tag="ul" direction="column">
        {statistics.congestion.QUICK.MON.map(({ hour, ratio }) => (
          <GraphBar key={hour} congestionRatio={ratio} hour={hour} />
        ))}
      </FlexBox>
    </FlexBox>
  );
};

export default StatisticsGraph;
