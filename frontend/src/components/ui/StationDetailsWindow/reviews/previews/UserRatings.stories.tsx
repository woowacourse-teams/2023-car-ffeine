import type { Meta } from '@storybook/react';

import Box from '@common/Box';

import type { UserRatingsProps } from '@ui/StationDetailsWindow/reviews/previews/UserRatings';
import UserRatings from '@ui/StationDetailsWindow/reviews/previews/UserRatings';

const meta = {
  title: 'UI/UserRatings',
  component: UserRatings,
  tags: ['autodocs'],
  args: {
    stationId: '',
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
