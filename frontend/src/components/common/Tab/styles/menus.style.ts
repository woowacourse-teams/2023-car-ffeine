import { css } from 'styled-components';

import { lineClampStyle } from '@common/styles/text';

import type { MenusProps } from '../Menus';

interface menuContainerStyleProps
  extends Pick<MenusProps, 'highlightColor' | 'noUnderline' | 'lineClamp'> {
  vertical: boolean | undefined;
}

export const menuContainerStyle = ({
  highlightColor,
  noUnderline,
  vertical = false,
  lineClamp,
}: menuContainerStyleProps) => css`
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  ${!noUnderline && `box-shadow: inset 0 -3px 0 -1px #eee;`}

  button {
    ${vertical && `box-shadow: inset 0 -3px 0 -1px #eee;`}
    ${lineClampStyle(lineClamp ? 1 : undefined)}
  }

  button.active {
    font-weight: 600;
    color: ${highlightColor};

    ${!noUnderline && `box-shadow: inset 0 -3px 0 -1px ${highlightColor};`}

    fill: ${highlightColor};
    stroke: ${highlightColor};
  }
`;
