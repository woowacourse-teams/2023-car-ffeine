import type { CSSProp } from 'styled-components';
import { css } from 'styled-components';

import Text from '@common/Text';
import { getToastColor } from '@common/Toast/Toast';

interface Props {
  message?: string;
  color?: string;
  backgroundColor?: string;
  css?: CSSProp;
}

export const ZOOM_WARNING_WIDTH = 21.8;

const ZoomWarningModal = ({ message, color, backgroundColor, css }: Props) => {
  return (
    <Text variant="h6" py={5} css={backgroundCss({ backgroundColor, color, css })}>
      {message ? message : '지도를 확대해 주세요'}
    </Text>
  );
};

const backgroundCss = ({ backgroundColor, color, css: _css }: Omit<Props, 'message'>) => css`
  ${!backgroundColor && getToastColor('dark')}

  width: ${ZOOM_WARNING_WIDTH}rem;
  text-align: center;
  border-width: 1.35px;
  border-radius: 10px;
  color: ${color};
  background: ${backgroundColor};

  ${_css}
`;

export default ZoomWarningModal;
