import type { Meta } from '@storybook/react';

import Bar from './Bar';

const meta = {
  title: 'UI/Bar',
  component: Bar,
  tags: ['autodocs'],
} satisfies Meta<typeof Bar>;

export default meta;

export const Default = () => {
  return (
    <>
      {Array.from({ length: 24 }).map((_, index) => (
        <Bar key={index} align={'column'} ratio={(index / 24) * 100} hour={index} />
      ))}
    </>
  );
};

export const NoRatio = () => {
  return (
    <>
      <Bar align={'column'} ratio={-1} hour={1} />
    </>
  );
};
