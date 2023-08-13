import type { Meta } from '@storybook/react';

import Box from '@common/Box';

import type { ReviewCardProps } from '@ui/StationDetailsWindow/reviews/ReviewCard';
import ReviewCard from '@ui/StationDetailsWindow/reviews/ReviewCard';
import ReviewCardSkeleton from '@ui/StationDetailsWindow/reviews/ReviewCardSkeleton';

import type { Reply } from '@type';

const meta = {
  title: 'UI/ReviewCard',
  component: ReviewCard,
  tags: ['autodocs'],
  args: {
    review: {
      content:
        '후면 주차가 어려운 충전소에요. 후면 주차가 어려운 충전소에요. 후면 주차가 어려운 충전소에요. ',
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
          replyId: 48589344,
          userId: 68104385,
        },
        {
          content: '동의하지 않아요',
          isDeleted: false,
          isUpdated: false,
          latestUpdateDate: '2023-08-03T15:11:40+00:00',
          replyId: 18503848,
          userId: 23849481,
        },
      ] as Reply[],
      reviewId: 0,
      userId: 23884823,
    },
    previewMode: false,
  },
  argTypes: {
    review: {
      description: 'Review 객체를 전달하면 카드를 만듭니다.',
    },
    previewMode: {
      description: '수정 및 삭제 컨트롤러를 제거할 수 있습니다.',
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

export const Skeleton = (args: ReviewCardProps) => {
  return (
    <Box width={80}>
      <ReviewCard {...args} />
      <ReviewCardSkeleton />
    </Box>
  );
};
