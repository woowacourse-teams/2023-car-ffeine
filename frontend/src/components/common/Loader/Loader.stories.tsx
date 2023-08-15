import type { Meta } from '@storybook/react';

import type { LoaderProps } from '@common/Loader/Loader';
import Loader from '@common/Loader/index';

const meta = {
  title: 'Components/Loader',
  component: Loader,
  tags: ['autodocs'],
  args: {
    size: 'xs',
  },
  argTypes: {
    size: {
      description:
        '사이즈를 부여할 수 있습니다. Size Props이외에도 필요에 따라 수동으로도 제어할 수 있습니다.',
    },
  },
} satisfies Meta<typeof Loader>;

export default meta;

export const Default = (args: LoaderProps) => {
  return <Loader {...args} />;
};
export const Colors = () => {
  return (
    <>
      <Loader />
      <Loader size="xs" />
      <Loader size="sm" />
      <Loader size="md" />
      <Loader size="lg" />
      <Loader size="xl" />
      <Loader size="xxl" />
      <Loader size="100px" />
    </>
  );
};
