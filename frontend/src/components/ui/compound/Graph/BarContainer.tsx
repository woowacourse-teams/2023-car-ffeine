import type { ReactNode } from 'react';
import { useContext } from 'react';

import FlexBox from '@common/FlexBox';

import { GraphContext, type GraphProps } from '.';

interface BarContainerProps extends GraphProps {
  renderBar: (hour: number, ratio: number) => ReactNode;
}

const BarContainer = ({ align, statistics, renderBar }: BarContainerProps) => {
  const { selectedDay } = useContext(GraphContext);

  return (
    <FlexBox
      direction={align}
      nowrap
      alignItems={align === 'row' ? 'end' : 'start'}
      width={align === 'column' && '100%'}
      height={align === 'row' && '100%'}
    >
      {statistics[selectedDay].map(({ hour, ratio }) => renderBar(hour, ratio))}
    </FlexBox>
  );
};

export default BarContainer;
