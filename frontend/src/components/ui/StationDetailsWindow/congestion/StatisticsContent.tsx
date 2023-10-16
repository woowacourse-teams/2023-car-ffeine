import FlexBox from '@common/FlexBox';

import type { Congestion } from '@type';

import Bar from './bar/Bar';

interface StatisticsContentProps {
  congestion: Congestion[];
}

const StatisticsContent = ({ congestion }: StatisticsContentProps) => {
  return (
    <FlexBox tag="ul" direction="column" nowrap alignItems="start" width="100%" height="auto">
      {congestion.map(({ hour, ratio }) => (
        <Bar key={`statistics-${hour}`} hour={`${hour + 1}`.padStart(2, '0')} ratio={ratio} />
      ))}
    </FlexBox>
  );
};

export default StatisticsContent;
