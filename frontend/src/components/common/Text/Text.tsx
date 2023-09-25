import type { CSSProp } from 'styled-components';

import type { HTMLAttributes } from 'react';

import { StyledText } from '@common/Text/Text.style';
import type { SpacingProps } from '@common/systems';

const variantList = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'title',
  'subtitle',
  'label',
  'body',
  'caption',
] as const;

export type VariantType = (typeof variantList)[number];

export interface TextProps extends HTMLAttributes<HTMLElement>, SpacingProps {
  tag?: string;
  variant?: VariantType;
  align?: 'center' | 'left' | 'right';
  color?: string;
  lineClamp?: number;
  fontSize?: number;
  weight?: 'bolder' | 'bold' | 'regular' | 'normal' | 'lighter';
  lineHeight?: number | string;
  css?: CSSProp;
}

const Text = ({ children, tag, lineClamp, lineHeight, ...props }: TextProps) => {
  const changeableTag = tag || 'p';

  return (
    <StyledText as={changeableTag} $lineHeight={lineHeight} $lineClamp={lineClamp} {...props}>
      {children}
    </StyledText>
  );
};

export default Text;
