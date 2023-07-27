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
      <Bar congestionRatio={congestionRatio}>
        {congestionRatio === -1 && <Text variant="caption">X</Text>}
      </Bar>
    </FlexBox>
  );
};

const Bar = styled.div<Omit<GraphBarProps, 'hour'>>`
  width: ${(props) =>
    props.congestionRatio === -1 ? '100%' : `calc(100% * ${props.congestionRatio} / 100)`};
  height: 1.2rem;

  text-align: center;

  border-radius: 1rem;
  background-color: ${({ congestionRatio }) => (congestionRatio === -1 ? '#b4b4b4' : '#0064ff')};
`;

export default GraphBar;
