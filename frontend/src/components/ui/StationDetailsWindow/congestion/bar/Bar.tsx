import styled from 'styled-components';

import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import { NO_RATIO } from '@constants/congestion';

interface BarProps {
  /** 0 ~ 1 사이의 숫자를 입력해 바 색상 채우기 가능
   * @example 0.2 = 20%
   */
  ratio: number;
  /** 그래프 옆에 표시될 시간 */
  hour: string;
}

const Bar = ({ ratio, hour }: BarProps) => {
  const isRatioUnknown = ratio === NO_RATIO;
  const barValue = ratio * 100;

  const gradient = {
    start: `#4D6CD0 ${100 - barValue}%`,
    middle: `#9274A3 ${150 - barValue}%`,
    end: `#FC5C5C ${200 - barValue}%`,
  } as const;

  return (
    <FlexBox tag="li" nowrap width="100%" alignItems="center">
      <Text variant="caption" fontSize={1.3} width={2}>
        {hour}
      </Text>
      <ProgressBar
        value={isRatioUnknown ? 100 : barValue}
        max={100}
        color={
          isRatioUnknown
            ? '#c8c8c8'
            : `linear-gradient(${`0.25turn, ${gradient.start}, ${gradient.middle}, ${gradient.end}`})`
        }
      />
    </FlexBox>
  );
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
    background: ${({ color }) => color};

    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

export default Bar;
