import type { Meta } from '@storybook/react';

import Help from '../congestion/Help';
import Box from './../../../common/Box';

const meta = {
  title: 'UI/Help',
  component: Help,
} satisfies Meta<typeof Help>;

export default meta;

export const Default = () => {
  return (
    <Box width="fit-content" border>
      <Help />
    </Box>
  );
};
