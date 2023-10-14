import type { ReactNode } from 'react';

import FlexBox from '@common/FlexBox';

import type { Congestion } from '@type';

import BarContainerSkeleton from './BarContainerSkeleton';

interface BarContainerProps {
  renderBar: (hour: string, ratio: number) => ReactNode;
  statistics: Congestion[];
  isLoading: boolean;
}

const BarContainer = ({ statistics, renderBar, isLoading }: BarContainerProps) => {
  return (
    <>
      {isLoading ? (
        <BarContainerSkeleton />
      ) : (
        <FlexBox tag="ul" direction="column" nowrap alignItems="start" width="100%" height="auto">
          {statistics.map(({ hour, ratio }) => renderBar(`${hour + 1}`.padStart(2, '0'), ratio))}
        </FlexBox>
      )}
    </>
  );
};

export default BarContainer;
