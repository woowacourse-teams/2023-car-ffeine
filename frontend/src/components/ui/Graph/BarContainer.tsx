import type { ReactNode } from 'react';
import { useContext } from 'react';

import FlexBox from '@common/FlexBox';

import { GraphContext, type GraphProps } from '.';

interface BarContainerProps extends GraphProps {
  renderBar: (hour: number, ratio: number) => ReactNode;
}

const BarContainer = ({ align, statistics, renderBar }: BarContainerProps) => {
  const { selectedDay } = useContext(GraphContext);

  console.log(selectedDay);

  return (
    <FlexBox
      direction={align}
      nowrap
      alignItems={align === 'row' ? 'end' : 'start'}
      width={align === 'column' && '28.4rem'}
      height={align === 'row' && '28.4rem'}
    >
      {statistics[selectedDay].map(({ hour, ratio }) => renderBar(hour, ratio))}
    </FlexBox>
  );
};

export default BarContainer;
