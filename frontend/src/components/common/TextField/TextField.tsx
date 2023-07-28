import type { CSSProp } from 'styled-components';
import styled from 'styled-components';

export interface TextFieldProps {
  placeHolder?: string;
  cssForLabel?: CSSProp;
  cssForInput?: CSSProp;
}

const Group = styled.div`
  position: relative;
  margin: 45px 0;
`;

const Input = styled.input<TextFieldProps>`
  background: none;
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 320px;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #c6c6c6;

  &:focus {
    outline: none;
  }

  &:focus ~ label,
  &:valid ~ label {
    top: -14px;
    font-size: 12px;
    color: #2196f3;
  }

  ${({ cssForInput }) => cssForInput};
`;

const Label = styled.label<TextFieldProps>`
  color: #c6c6c6;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  ${({ cssForLabel }) => cssForLabel};
`;

const TextField = ({ placeHolder, ...props }: TextFieldProps) => {
  return (
    <Group>
      <Input type="text" required {...props} />
      <Label {...props}>{placeHolder}</Label>
    </Group>
  );
};

export default TextField;
