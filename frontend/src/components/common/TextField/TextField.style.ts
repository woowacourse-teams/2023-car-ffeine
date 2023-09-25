import styled from 'styled-components';

import type { TextFieldProps } from '@common/TextField/TextField';

export const StyledGroup = styled.div`
  position: relative;
  margin: 2rem 0;
`;

export const StyledInput = styled.input<TextFieldProps>`
  background: none;
  font-size: 1.8rem;
  padding: 1rem 1rem 1rem 0.5rem;
  display: block;

  ${({ width }) => width && `width: ${width * 0.4}rem`};
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}

  border: none;
  border-radius: 0;
  border-bottom: 1px solid #c6c6c6;

  &:focus {
    outline: none;
  }

  &:focus ~ label,
  &:valid ~ label {
    top: -1.4rem;
    font-size: 1.2rem;
    color: #2196f3;
  }

  ${({ cssForInput }) => cssForInput};
`;

export const StyledHelperText = styled.div`
  color: red;
  font-size: 1.2rem;
  margin-top: 0.5rem;
`;

export const StyledLabel = styled.label<TextFieldProps>`
  color: #c6c6c6;
  font-size: 1.6rem;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 0.5rem;
  top: 1rem;
  transition: 300ms ease all;

  ${({ cssForLabel }) => cssForLabel};
`;
