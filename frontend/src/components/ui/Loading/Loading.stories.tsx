import type { Meta } from '@storybook/react';

import Loading from './Loading';

const meta = {
  title: 'UI/Loading',
  component: Loading,
  tags: ['autodocs'],
} satisfies Meta<typeof Loading>;

export default meta;

export const Default = () => {
  return <Loading />;
};
