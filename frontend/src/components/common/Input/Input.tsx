import type { CSSProp } from 'styled-components';
import styled from 'styled-components';

export interface InputProps {
  css?: CSSProp;
}

const InputWrapper = styled.input<InputProps>`
  ${({ css }) => css};
`;

const Input = ({ ...props }: InputProps) => {
  return <InputWrapper {...props} />;
};

export default Input;
