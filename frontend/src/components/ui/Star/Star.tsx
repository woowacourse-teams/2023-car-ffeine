import { StarIcon } from '@heroicons/react/24/solid';
import styled, { css } from 'styled-components';

import type { Size } from '@type';

export interface StarProps {
  isSelected: boolean;
  onClick: () => void;
  size?: Size;
}

const getSize = (size: Size) => {
  switch (size) {
    case 'xs':
      return css`
        width: 1.2rem;
        height: 1.2rem;
      `;
    case 'sm':
      return css`
        width: 1.8rem;
        height: 1.8rem;
      `;
    case 'md':
      return css`
        width: 2.4rem;
        height: 2.4rem;
      `;
    case 'lg':
      return css`
        width: 3rem;
        height: 3rem;
      `;
    case 'xl':
      return css`
        width: 3.6rem;
        height: 3.6rem;
      `;
    case 'xxl':
      return css`
        width: 4.2rem;
        height: 4.2rem;
      `;
    default:
      return css`
        width: 2.4rem;
        height: 2.4rem;
      `;
  }
};

const StyledStarIcon = styled(StarIcon)<StarProps>`
  ${({ size }) => getSize(size)};

  cursor: pointer;
  color: ${({ isSelected }) => (isSelected ? '#FFD700' : '#CCC')};
`;

const Star = ({ isSelected, onClick, size }: StarProps) => {
  return <StyledStarIcon isSelected={isSelected} onClick={onClick} size={size} />;
};

export default Star;
