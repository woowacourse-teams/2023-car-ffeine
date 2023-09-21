import type { CSSProp } from 'styled-components';
import styled from 'styled-components';

import type { ChangeEvent, HTMLAttributes } from 'react';

export interface TextFieldProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  width?: number;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  supportingText?: string;
  fullWidth?: boolean;
  cssForLabel?: CSSProp;
  cssForInput?: CSSProp;
}

const TextField = ({ label, supportingText, ...props }: TextFieldProps) => {
  return (
    <Group>
      <Input type="text" $style={{ ...props }} />
      <Label $style={{ ...props }}>{label}</Label>
      {supportingText && <HelperText>{supportingText}</HelperText>}
    </Group>
  );
};

export default TextField;

const Group = styled.div`
  position: relative;
  margin: 2rem 0;
`;

const Input = styled.input<{
  $style: Omit<TextFieldProps, 'label' | 'supportingText' | 'cssForLabel'>;
}>`
  background: none;
  font-size: 1.8rem;
  padding: 1rem 1rem 1rem 0.5rem;
  display: block;

  ${({ $style }) => $style.width && `width: ${$style.width * 0.4}rem`};
  ${({ $style }) => $style.fullWidth && 'width: 100%;'}

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

  ${({ $style }) => $style.cssForInput};
`;

const HelperText = styled.div`
  color: red;
  font-size: 1.2rem;
  margin-top: 0.5rem;
`;

const Label = styled.label<{ $style: Pick<TextFieldProps, 'cssForLabel'> }>`
  color: #c6c6c6;
  font-size: 1.6rem;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 0.5rem;
  top: 1rem;
  transition: 300ms ease all;

  ${({ $style }) => $style.cssForLabel};
`;
