import type { ReactNode } from 'react';

import FlexBox from '@common/FlexBox';

import CongestionBarContainerSkeleton from '@ui/StationDetailsWindow/congestion/CongestionBarContainerSkeleton';

import type { Congestion } from '@type';

import type { GraphProps } from '.';

interface BarContainerProps extends GraphProps {
  renderBar: (hour: string, ratio: number) => ReactNode;
  statistics: Congestion[];
  isLoading: boolean;
}

const BarContainer = ({ align, statistics, renderBar, isLoading }: BarContainerProps) => {
  return (
    <>
      {isLoading ? (
        <CongestionBarContainerSkeleton />
      ) : (
        <FlexBox
          direction={align}
          nowrap
          alignItems={align === 'row' ? 'end' : 'start'}
          width={align === 'column' && '100%'}
          height={align === 'row' && '100%'}
        >
          {statistics.map(({ hour, ratio }) => renderBar(`${hour + 1}`.padStart(2, '0'), ratio))}
        </FlexBox>
      )}
    </>
  );
};

export default BarContainer;
