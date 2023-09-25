import { css } from 'styled-components';

import { getToastColor } from '@common/Toast/Toast.style';

import type { ZoomWarningModalProps } from '@ui/WarningModal/ZoomWarningModal';

export const ZOOM_WARNING_WIDTH = 21.8;

export const backgroundCss = ({
  backgroundColor,
  color,
  css: _css,
}: Omit<ZoomWarningModalProps, 'message'>) => css`
  ${!backgroundColor && getToastColor('dark')}

  width: ${ZOOM_WARNING_WIDTH}rem;
  text-align: center;
  border-width: 1.35px;
  border-radius: 10px;
  color: ${color};
  background: ${backgroundColor};

  ${_css}
`;
