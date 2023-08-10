import type { Meta } from '@storybook/react';

import Box from '@common/Box';

import type { UserRatingsProps } from '@ui/StationDetailsWindow/reviews/UserRatings';
import UserRatings from '@ui/StationDetailsWindow/reviews/UserRatings';

const meta = {
  title: 'UI/UserRatings',
  component: UserRatings,
  tags: ['autodocs'],
  args: {
    ratings: 4.8,
    counts: 325,
  },
  argTypes: {},
} satisfies Meta<typeof UserRatings>;

export default meta;

export const Default = (args: UserRatingsProps) => {
  return (
    <Box width={80} border p={4}>
      <UserRatings {...args} />
    </Box>
  );
};
