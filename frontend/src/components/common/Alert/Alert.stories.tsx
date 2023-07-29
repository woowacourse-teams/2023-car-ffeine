import type { Meta } from '@storybook/react';

import type { AlertProps } from './Alert';
import Alert from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
} satisfies Meta<typeof Alert>;

export default meta;

export const Default = (args: AlertProps) => {
  return <Alert {...args} />;
};
export const Colors = () => {
  return (
    <>
      <Alert type="primary" message="primary" />
      <Alert type="secondary" message="secondary" />
      <Alert type="success" message="success" />
      <Alert type="error" message="error" />
      <Alert type="warning" message="warning" />
      <Alert type="info" message="info" />
      <Alert type="light" message="light" />
      <Alert type="dark" message="dark" />
    </>
  );
};
