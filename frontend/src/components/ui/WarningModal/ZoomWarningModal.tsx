import type { CSSProp } from 'styled-components';

import Text from '@common/Text';

import { backgroundCss } from '@ui/WarningModal/ZoomWarningModal.style';

export interface ZoomWarningModalProps {
  message?: string;
  color?: string;
  backgroundColor?: string;
  css?: CSSProp;
}

const ZoomWarningModal = ({ message, color, backgroundColor, css }: ZoomWarningModalProps) => {
  return (
    <Text variant="h6" py={5} css={backgroundCss({ backgroundColor, color, css })}>
      {message ? message : '지도를 확대해 주세요'}
    </Text>
  );
};

export default ZoomWarningModal;
