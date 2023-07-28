import { styled } from 'styled-components';

import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

interface GraphBarProps {
  congestionRatio: number;
  hour: number;
}

const GraphBar = ({ congestionRatio, hour }: GraphBarProps) => {
  return (
    <FlexBox tag="li" width="28.4rem" nowrap={true}>
      <div style={{ width: '2rem' }}>
        <Text variant="caption">{hour}</Text>
      </div>
      <Bar congestionRatio={congestionRatio} />
    </FlexBox>
  );
};

const Bar = styled.div<Omit<GraphBarProps, 'hour'>>`
  width: ${({ congestionRatio }) =>
    congestionRatio === -1 ? '100%' : `calc(100% * ${congestionRatio} / 100)`};
  height: 1.2rem;

  text-align: center;

  border-radius: 1rem;
  background-color: ${({ congestionRatio }) => (congestionRatio === -1 ? '#afafaf' : '#0064ff')};
`;

export default GraphBar;
