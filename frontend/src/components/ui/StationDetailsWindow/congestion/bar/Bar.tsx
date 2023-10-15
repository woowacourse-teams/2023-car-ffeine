import { styled } from 'styled-components';

import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import { getHoverColor } from '@style';

import { NO_RATIO } from '@constants/congestion';

interface BarProps {
  ratio: number;
  hour: string;
}

const Bar = ({ ratio, hour }: BarProps) => {
  return (
    <FlexBox tag="li" nowrap width="100%" alignItems="center">
      <Text variant="caption" fontSize={1.3} width={2}>
        {hour}
      </Text>
      <ProgressBar
        value={ratio === NO_RATIO ? 100 : ratio * 100}
        max={100}
        color={getColorByRatio(ratio)}
      />
    </FlexBox>
  );
};

const getColorByRatio = (ratio: number) => {
  if (ratio === NO_RATIO) {
    return getHoverColor('disable');
  }

  return '#4D6CD0';
};

const ProgressBar = styled.progress<{ color: string }>`
  width: 100%;
  height: 1rem;

  -webkit-appearance: none;
  appearance: none;

  &::-webkit-progress-bar {
    background-color: #eff1f9;

    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  &::-webkit-progress-value {
    background-color: ${({ color }) => color};

    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

export default Bar;
