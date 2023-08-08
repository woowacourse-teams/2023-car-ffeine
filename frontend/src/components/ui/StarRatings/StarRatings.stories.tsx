import type { Meta } from '@storybook/react';

import { useState } from 'react';

import Text from '@common/Text';

import StarRatings from '@ui/StarRatings';
import type { StarRatingsProps } from '@ui/StarRatings/StarRatings';

const meta = {
  title: 'UI/StarRatings',
  component: StarRatings,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
} satisfies Meta<typeof StarRatings>;

export default meta;

export const Default = (args: StarRatingsProps) => {
  return <StarRatings {...args} />;
};

export const Controllable = () => {
  const [stars, setStars] = useState(0);
  return (
    <div>
      <Text variant="h1">Rating: {stars}</Text>
      <StarRatings stars={stars} setStars={setStars} />
    </div>
  );
};
export const Sizes = () => {
  const [stars, setStars] = useState(0);
  return (
    <div>
      <Text variant="h1">Rating: {stars}</Text>
      <StarRatings stars={stars} setStars={setStars} size="xs" />
      <StarRatings stars={stars} setStars={setStars} size="sm" />
      <StarRatings stars={stars} setStars={setStars} size="md" />
      <StarRatings stars={stars} setStars={setStars} size="lg" />
      <StarRatings stars={stars} setStars={setStars} size="xl" />
      <StarRatings stars={stars} setStars={setStars} size="xxl" />
    </div>
  );
};
