import type { CSSProp } from 'styled-components';

import type { Color } from '@type/style';

import { StyledAlert } from './Alert.style';

export interface AlertProps {
  color: Color;
  text: string;
  css?: CSSProp;
}

const Alert = ({ ...props }: AlertProps) => {
  return <StyledAlert {...props}>{props.text}</StyledAlert>;
};

export default Alert;
