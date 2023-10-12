import type { Meta } from '@storybook/react';

import NotFound from './NotFound';

const meta = {
  component: NotFound,
  title: 'UI/NotFound',
  tags: ['autodocs'],
} satisfies Meta<typeof NotFound>;

export default meta;

export const Default = () => {
  return <NotFound />;
};
