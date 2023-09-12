import type { ReactNode } from 'react';

import FlexBox from '@common/FlexBox';

import type { Congestion } from '@type';

import { type GraphProps } from '.';

interface BarContainerProps extends GraphProps {
  renderBar: (hour: number, ratio: number) => ReactNode;
  statistics: Congestion[];
}

const BarContainer = ({ align, statistics, renderBar }: BarContainerProps) => {
  return (
    <FlexBox
      direction={align}
      nowrap
      alignItems={align === 'row' ? 'end' : 'start'}
      width={align === 'column' && '100%'}
      height={align === 'row' && '100%'}
    >
      {statistics.map(({ hour, ratio }) => renderBar(hour, ratio))}
    </FlexBox>
  );
};

export default BarContainer;
