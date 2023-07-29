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
    <FlexBox direction={align} nowrap={true} css={align === 'row' && rowAlignGraphCss}>
      {statistics[selectedDay].map(({ hour, ratio }) => renderBar(hour, ratio))}
    </FlexBox>
  );
};

const rowAlignGraphCss = css`
  align-items: flex-end;
`;

export default BarContainer;
