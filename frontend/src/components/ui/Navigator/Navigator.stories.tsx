import type { Meta } from '@storybook/react';

import Navigator from './Navigator';

const meta = {
  title: 'UI/Navigator',
  component: Navigator,
} satisfies Meta<typeof Navigator>;

export default meta;

export const Default = () => {
  return <Navigator />;
};
