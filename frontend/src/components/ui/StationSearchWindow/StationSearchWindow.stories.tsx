import type { Meta } from '@storybook/react';

import StationSearchWindow from './StationSearchWindow';

const meta = {
  title: 'Components/StationSearchWindow',
  component: StationSearchWindow,
} satisfies Meta<typeof StationSearchWindow>;

export default meta;

export const Default = () => {
  return <StationSearchWindow />;
};
