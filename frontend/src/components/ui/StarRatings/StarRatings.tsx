import styled from 'styled-components';

import Star from '@ui/Star';

import type { Size } from '@type';

export interface StarRatingsProps {
  stars: number;
  setStars: (newStar: number) => void;
  size?: Size;
}

const StarRatings = ({ stars, setStars, size }: StarRatingsProps) => {
  const handleStarClick = (selectedStars: number) => {
    setStars(selectedStars);
  };

  return (
    <StarContainer>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          isSelected={index < stars}
          onClick={() => handleStarClick(index + 1)}
          size={size}
        />
      ))}
    </StarContainer>
  );
};

const StarContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default StarRatings;
