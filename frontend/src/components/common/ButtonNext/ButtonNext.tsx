import styled from 'styled-components';

import type { ButtonProps } from '@common/Button/Button';

export interface ButtonNextProps {
  variant: 'text' | 'outlined' | 'contained';
}

const ButtonNext = ({ variant }: ButtonNextProps) => {
  return <S.Button />;
};

const S = {
  Button: styled.button<ButtonProps>``,
};

export default ButtonNext;
