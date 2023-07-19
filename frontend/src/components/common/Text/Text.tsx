import styled, { css } from 'styled-components';

const Text = styled.span<{ variant?: string }>`
  ${({ variant }) => {
    switch (variant) {
      case 'h1':
        return css`
          font-size: 3rem;
          font-weight: bold;
        `;
      case 'h2':
        return css`
          font-size: 2.5rem;
          font-weight: bold;
        `;
      case 'h3':
        return css`
          font-size: 2rem;
          font-weight: bold;
        `;
      case 'h4':
        return css`
          font-size: 1.5rem;
          font-weight: bold;
        `;
      case 'h5':
        return css`
          font-size: 1.25rem;
          font-weight: bold;
        `;
      case 'h6':
        return css`
          font-size: 1rem;
          font-weight: bold;
        `;
      case 'title':
        return css`
          font-size: 1.5rem;
          font-weight: bold;
        `;
      case 'subtitle1':
        return css`
          font-size: 1rem;
          /* font-weight: bold; */
        `;
      case 'subtitle2':
        return css`
          font-size: 0.875rem;
          /* font-weight: bold; */
        `;
      case 'body':
        return css`
          font-size: 1rem;
        `;
      case 'caption':
        return css`
          font-size: 0.75rem;
          color: #666;
        `;
      default:
        return css`
          font-size: 1rem;
        `;
    }
  }}
`;
export default Text;
