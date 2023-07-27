import FlexBox from '@common/FlexBox';

import GraphBar from './GraphBar';

import type { CongestionStatistics } from 'types';

interface Props {
  statistics: CongestionStatistics;
}

const StatisticsGraph = ({ statistics }: Props) => {
  console.log(statistics);
  return (
    <FlexBox tag="ul" direction="column">
      {statistics.congestion.QUICK.MON.map(({ hour, ratio }) => (
        <GraphBar key={hour} congestionPercentage={ratio} />
      ))}
    </FlexBox>
  );
};

export default StatisticsGraph;
