import type { Meta } from '@storybook/react';

import React, { useState } from 'react';

import Text from '@common/Text';

import StarRatings from '@ui/StarRatings';
import type { StarRatingsProps } from '@ui/StarRatings/StarRatings';

import { Size } from '@type';

const meta = {
  title: 'UI/StarRatings',
  component: StarRatings,
  tags: ['autodocs'],
  args: {
    stars: 3,
    setStars: () => {
      alert('제가 눌렸어요!!!');
    },
    size: 'md',
  },
  argTypes: {
    stars: {
      description: '0~5의 숫자를 줄 수 있습니다. ',
    },
    setStars: {
      description: '별의 갯수롤 조절할 수 있습니다.',
    },
    size: {
      description: '사이즈를 조절할 수 있습니다.',
    },
  },
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
