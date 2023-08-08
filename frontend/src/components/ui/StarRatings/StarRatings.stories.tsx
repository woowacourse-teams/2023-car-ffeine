import type { Meta } from '@storybook/react';

import { useState } from 'react';

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
  return <StarRatings stars={stars} setStars={setStars} />;
};
