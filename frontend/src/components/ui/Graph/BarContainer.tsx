import { css } from 'styled-components';

import { useContext } from 'react';

import FlexBox from '@common/FlexBox';

import { GraphContext, type GraphProps } from '.';

interface BarContainerProps extends GraphProps {
  renderBar: (hour: number, ratio: number) => JSX.Element;
}

const BarContainer = ({ align, statistics, renderBar }: BarContainerProps) => {
  const { selectedDay } = useContext(GraphContext);

  return (
    <FlexBox
      direction={align}
      nowrap={true}
      alignItems={align === 'row' ? 'end' : 'start'}
      width={align === 'column' && '28.4rem'}
      height={align === 'row' && '28.4rem'}
    >
      {statistics[selectedDay].map(({ hour, ratio }) => renderBar(hour, ratio))}
    </FlexBox>
  );
};

export default BarContainer;
