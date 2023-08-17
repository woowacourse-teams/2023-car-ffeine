import type { Meta } from '@storybook/react';

import Loading from './Loading';

const meta = {
  component: Loading,
  tags: ['autodocs'],
} satisfies Meta<typeof Loading>;

export default meta;

export const Default = () => {
  return <Loading />;
};
