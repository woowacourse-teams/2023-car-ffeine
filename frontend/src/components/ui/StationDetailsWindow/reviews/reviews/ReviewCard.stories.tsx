import type { Meta } from '@storybook/react';

import Box from '../../../../common/Box';
import type { ReviewCardProps } from './ReviewCard';
import ReviewCard from './ReviewCard';
import ReviewCardSkeleton from './ReviewCardSkeleton';

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
      replySize: 3,
      reviewId: 0,
      memberId: 23884823,
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
