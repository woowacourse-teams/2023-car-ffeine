import type { Meta } from '@storybook/react';

import { useSetExternalState } from '@utils/external-state';

import { stationSearchWindowOpenStore } from '@stores/stationSearchWindowOpenStore';

import Navigator from '@ui/Navigator';

import StationSearchWindow from './StationSearchWindow';

const meta = {
  title: 'UI/StationSearchWindow',
  component: StationSearchWindow,
} satisfies Meta<typeof StationSearchWindow>;

export default meta;

export const Default = () => {
  const setIsOpen = useSetExternalState(stationSearchWindowOpenStore);

  setIsOpen(true);

  return (
    <>
      <Navigator />
      <StationSearchWindow />
    </>
  );
};
