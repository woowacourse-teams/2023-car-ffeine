import { css } from '@emotion/react';

export const lineClampStyle = (lineClamp?: number) => css`
  ${lineClamp &&
  `
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${lineClamp};
    `}

  ${lineClamp === 1 && `white-space: nowrap;`}
`;
