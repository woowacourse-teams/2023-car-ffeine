import { css, styled } from 'styled-components';

import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import { getHoverColor } from '@style';

import { NO_RATIO } from '@constants/congestion';

interface BarProps {
  ratio: number;
  hour: string;
  align: 'row' | 'column';
}

const Bar = ({ ratio, hour, align }: BarProps) => {
  return (
    <FlexBox
      tag="li"
      nowrap
      width="100%"
      direction={align === 'column' ? 'row' : 'column'}
      css={align === 'row' && rowAlignCss}
      alignItems="center"
    >
      <Text variant="caption" css={align === 'column' && textCss}>
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

  return '#2a6cd8';
};

const ProgressBar = styled.progress<{ color: string }>`
  width: 100%;
  height: 1.2rem;

  -webkit-appearance: none;
  appearance: none;

  &::-webkit-progress-bar {
    background-color: #eee;

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

const rowAlignCss = css`
  flex-direction: column-reverse;
`;

const textCss = css`
  width: 2rem;
`;

export default Bar;
