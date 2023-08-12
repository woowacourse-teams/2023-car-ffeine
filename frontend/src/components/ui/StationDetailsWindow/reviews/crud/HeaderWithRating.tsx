import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import StarRatings from '@ui/StarRatings';

interface HeaderWithRatingProps {
  title: string;
  stars: number;
  setStars: (newStars: number) => void;
}

const HeaderWithRating = ({ title, setStars, stars }: HeaderWithRatingProps) => {
  return (
    <>
      <FlexBox justifyContent="between" alignItems="center">
        <Text variant="subtitle" px={1}>
          {title}
        </Text>
        <FlexBox justifyContent="center" alignItems="center">
          <Text variant="subtitle">별점 </Text>
          <StarRatings stars={stars} setStars={setStars} size="md" />
        </FlexBox>
      </FlexBox>
    </>
  );
};

export default HeaderWithRating;
