import type { CSSProp } from 'styled-components';

import { StyledAlert } from '@common/Alert/Alert.style';

import type { Color } from '@type/style';

export interface AlertProps {
  color: Color;
  text: string;
  css?: CSSProp;
}

const Alert = ({ ...props }: AlertProps) => {
  return <StyledAlert {...props}>{props.text}</StyledAlert>;
};

export default Alert;
