import type { Meta } from '@storybook/react';

import Box from '@common/Box';

import type { ReviewCardProps } from '@ui/StationDetailsWindow/reviews/ReviewCard';
import ReviewCard from '@ui/StationDetailsWindow/reviews/ReviewCard';

import type { Reply } from '@type';

const meta = {
  title: 'UI/ReviewCard',
  component: ReviewCard,
  tags: ['autodocs'],
  args: {
    review: {
      content: '후면 주차가 어려워요',
      isDeleted: false,
      isUpdated: false,
      latestUpdateDate: '2023-07-30T15:11:40+00:00',
      ratings: 4,
      replies: [
        {
          content: '동의해요',
          isDeleted: false,
          isUpdated: false,
          latestUpdateDate: '2023-08-09T15:11:40+00:00',
          replyId: 0,
          userId: 0,
        },
        {
          content: '동의하지 않아요',
          isDeleted: false,
          isUpdated: false,
          latestUpdateDate: '2023-08-03T15:11:40+00:00',
          replyId: 0,
          userId: 0,
        },
      ] as Reply[],
      reviewId: 0,
      userId: 23884823,
    },
  },
  argTypes: {
    review: {
      description: 'ㅇㅇ',
    },
  },
} satisfies Meta<typeof ReviewCard>;

export default meta;

export const Default = (args: ReviewCardProps) => {
  return (
    <Box width={80}>
      <ReviewCard {...args} />
      <ReviewCard {...args} />
      <ReviewCard {...args} />
    </Box>
  );
};
