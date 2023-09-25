import type { CSSProp } from 'styled-components';

import type { ButtonHTMLAttributes, MouseEventHandler } from 'react';

import type { BUTTON_PADDING_SIZE } from '@common/Button/Button.style';
import { StyledButton } from '@common/Button/Button.style';
import type { SpacingProps } from '@common/systems';

import type { BorderRadiusDirectionType } from '@type/style';

export type VariantType = 'pill' | 'label';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, SpacingProps {
  variant?: VariantType;
  width?: string | number;
  height?: string | number;
  noRadius?: BorderRadiusDirectionType;
  shadow?: boolean;
  size?: keyof typeof BUTTON_PADDING_SIZE;
  outlined?: boolean;
  background?: string;
  hover?: boolean;
  css?: CSSProp;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, noRadius, ...props }: ButtonProps) => {
  return (
    <StyledButton type="button" $noRadius={noRadius} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
