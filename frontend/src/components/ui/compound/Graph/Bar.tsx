import { css, styled } from 'styled-components';

import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

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
      <StyledBar ratio={ratio} align={align} />
      <BackgroundBar ratio={ratio} align={align} />
    </FlexBox>
  );
};

const StyledBar = styled.div<Omit<BarProps, 'hour'>>`
  ${({ align, ratio }) =>
    align === 'column'
      ? `
        width: ${ratio === NO_RATIO ? '100%' : `calc(100% * ${ratio} / 100)`};
        height: 1.2rem;
      `
      : `
        height: ${ratio === NO_RATIO ? '100%' : `calc(100% * ${ratio} / 100)`};
        width: 1.2rem;

      `}

  text-align: center;

  border-top-left-radius: 0.4rem;
  border-bottom-left-radius: 0.4rem;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  background-color: ${({ ratio }) => (ratio === NO_RATIO ? '#afafaf42' : '#0064ff')};
`;

const BackgroundBar = styled.div<Omit<BarProps, 'hour'>>`
  ${({ align, ratio }) =>
    align === 'column'
      ? `
        width: ${ratio === NO_RATIO ? '0' : `calc(100% * ${100 - ratio} / 100)`};
        height: 1.2rem;
      `
      : `
        height: ${ratio === NO_RATIO ? '0' : `calc(100% * ${100 - ratio} / 100)`};
        width: 1.2rem;

      `}

  text-align: center;

  border-top-left-radius: 0.4rem;
  border-bottom-left-radius: 0.4rem;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  background-color: #e9edf8;
`;

const rowAlignCss = css`
  flex-direction: column-reverse;
`;

const textCss = css`
  width: 2rem;
`;

export default Bar;
