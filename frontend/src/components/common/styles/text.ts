import { css } from 'styled-components';

export const lineClampStyle = (lineClamp?: number) => css`
  ${lineClamp &&
  `
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${lineClamp};
    `}
`;
