import { styled } from 'styled-components';

import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

interface BarProps {
  ratio: number;
  hour: number;
}

const Bar = ({ ratio, hour }: BarProps) => {
  return (
    <FlexBox tag="li" width="28.4rem" nowrap={true}>
      <div style={{ width: '2rem' }}>
        <Text variant="caption">{hour}</Text>
      </div>
      <StyledBar ratio={ratio} />
    </FlexBox>
  );
};

const StyledBar = styled.div<Omit<BarProps, 'hour'>>`
  width: ${({ ratio: congestionRatio }) =>
    congestionRatio === -1 ? '100%' : `calc(100% * ${congestionRatio} / 100)`};
  height: 1.2rem;

  text-align: center;

  border-radius: 1rem;
  background-color: ${({ ratio: congestionRatio }) =>
    congestionRatio === -1 ? '#afafaf' : '#0064ff'};
`;

export default Bar;
