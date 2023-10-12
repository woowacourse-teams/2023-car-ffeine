import type { Meta } from '@storybook/react';

import Box from '../../../../common/Box';
import type { UserRatingsProps } from './UserRatings';
import UserRatings from './UserRatings';

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
    <Box width={32} border p={4}>
      <UserRatings {...args} />
    </Box>
  );
};
