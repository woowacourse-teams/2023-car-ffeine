import type { CSSProp } from 'styled-components';

import { StyledLoader } from '@common/Loader/Loader.style';

import type { Size } from '@type';

export interface LoaderProps {
  size?: Size | string;
  border?: number;
  css?: CSSProp;
}

const Loader = ({ size, border, css }: LoaderProps) => {
  return <StyledLoader size={size} border={border} css={css} />;
};

export default Loader;
