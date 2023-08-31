import { css, styled } from 'styled-components';

import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import { getHoverColor } from '@style';

import { NO_RATIO } from '@constants/congestion';

interface BarProps {
  ratio: number;
  hour: number;
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
      alignItems={align === 'row' ? 'center' : 'start'}
    >
      <Text variant="caption" css={align === 'column' && textCss}>
        {hour}
      </Text>
      <ProgressBar
        value={ratio === NO_RATIO ? 100 : ratio}
        max={100}
        color={getColorByRatio(ratio)}
      />
    </FlexBox>
  );
};

const getColorByRatio = (ratio: number) => {
  if (ratio === NO_RATIO) {
    return getHoverColor('secondary');
  }

  return '#0064ff';
};

const ProgressBar = styled.progress<{ color: string }>`
  width: 100%;
  height: 1.2rem;

  -webkit-appearance: none;
  appearance: none;

  &::-webkit-progress-bar {
    background-color: #eee;

    border-top-left-radius: 0.4rem;
    border-bottom-left-radius: 0.4rem;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }

  &::-webkit-progress-value {
    background-color: ${({ color }) => color};

    border-top-left-radius: 0.4rem;
    border-bottom-left-radius: 0.4rem;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
`;

const rowAlignCss = css`
  flex-direction: column-reverse;
`;

const textCss = css`
  width: 2rem;
`;

export default Bar;
