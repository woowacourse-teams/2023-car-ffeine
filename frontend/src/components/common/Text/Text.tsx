import type { CSSProp } from 'styled-components';

import type { CommonStyleProps } from '@common/styles/common';
import type { SpacingProps } from '@common/styles/spacing';
import type { BaseProps } from '@common/types/base';

import { StyledText } from './Text.style';

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
  'pillbox',
] as const;

export type VariantType = (typeof variantList)[number];

export interface TextProps extends CommonStyleProps, SpacingProps, BaseProps {
  variant?: VariantType;
  align?: 'center' | 'left' | 'right';
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
