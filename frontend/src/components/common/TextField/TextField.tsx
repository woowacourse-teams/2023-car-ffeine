import type { CSSProp } from 'styled-components';
import styled from 'styled-components';

import type { ChangeEvent, HTMLAttributes } from 'react';

export interface TextFieldProps extends HTMLAttributes<HTMLElement> {
  // textFieldId: string;
  placeholder?: string;
  width?: number;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  cssForLabel?: CSSProp;
  cssForInput?: CSSProp;
}

const Group = styled.div`
  position: relative;
  margin: 4.5rem 0;
`;

const Input = styled.input<TextFieldProps>`
  background: none;
  font-size: 1.8rem;
  padding: 1rem 1rem 1rem 0.5rem;
  display: block;

  ${({ width }) => width && `width: ${width * 0.4}rem`};

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

const HelperText = styled.div`
  color: red;
  font-size: 1.2rem;
  margin-top: 0.5rem;
`;

const Label = styled.label<TextFieldProps>`
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

const TextField = ({
  // textFieldId,
  placeholder,
  value,
  onChange,
  helperText,
  ...props
}: TextFieldProps) => {
  return (
    <Group>
      <Input
        type="text"
        // id={textFieldId}
        required
        {...props}
        value={value}
        onChange={onChange}
      />
      <Label
        // htmlFor={textFieldId}
        {...props}
      >
        {placeholder}
      </Label>
      {helperText && <HelperText>{helperText}</HelperText>}
    </Group>
  );
};

export default TextField;
