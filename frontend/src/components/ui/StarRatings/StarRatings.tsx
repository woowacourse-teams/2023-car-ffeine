import type { Dispatch, SetStateAction } from 'react';

export interface StarRatingsProps {
  stars: number;
  setStars: Dispatch<SetStateAction<number>>;
}

const StarRatings = ({ stars, setStars }: StarRatingsProps) => {
  return <></>;
};

export default StarRatings;
