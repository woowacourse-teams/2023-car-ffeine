import { styled } from 'styled-components';

import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

interface GraphBarProps {
  congestionRatio: number;
  hour: number;
}

const GraphBar = ({ congestionRatio, hour }: GraphBarProps) => {
  return (
    <FlexBox>
      <div style={{ width: '2rem' }}>
        <Text variant="caption">{hour}</Text>
      </div>
      <Bar congestionRatio={congestionRatio} />
    </FlexBox>
  );
};

const Bar = styled.li<Omit<GraphBarProps, 'hour'>>`
  width: ${(props) => `calc(26rem * ${props.congestionRatio} / 100)`};
  height: 1rem;

  border-radius: 1rem;
  background-color: #0064ff;
`;

export default GraphBar;
