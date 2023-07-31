import { css, styled } from 'styled-components';

import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

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
      direction={align === 'column' ? 'row' : 'column'}
      css={align === 'row' && rowAlignCss}
      alignItems={align === 'row' ? 'center' : 'start'}
    >
      <Text variant="caption" css={align === 'column' && textCss}>
        {hour}
      </Text>
      <StyledBar ratio={ratio} align={align} />
    </FlexBox>
  );
};

const StyledBar = styled.div<Omit<BarProps, 'hour'>>`
  ${({ align, ratio }) =>
    align === 'column'
      ? `
        width: ${ratio === -1 ? '26rem' : `calc(26rem * ${ratio} / 100)`};
        height: 1.2rem;
      `
      : `
        height: ${ratio === -1 ? '26rem' : `calc(26rem * ${ratio} / 100)`};
        width: 1.2rem;

      `}

  text-align: center;

  border-radius: 1rem;
  background-color: ${({ ratio }) => (ratio === -1 ? '#afafaf' : '#0064ff')};
`;

const rowAlignCss = css`
  flex-direction: column-reverse;
`;

const textCss = css`
  width: 2rem;
`;

export default Bar;
