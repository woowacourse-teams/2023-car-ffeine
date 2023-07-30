import type { Meta } from '@storybook/react';

import List from '@common/List';

import ChargerCard from '@ui/DetailedStationInfo/ChargerCard';

const meta = {
  title: 'UI/ChargerCard',
  component: ChargerCard,
} satisfies Meta<typeof ChargerCard>;

export default meta;

export const Default = () => {
  return (
    <List>
      <ChargerCard
        charger={{
          type: 'DC_AC_3PHASE',
          price: 200,
          capacity: 3,
          latestUpdateTime: '2023-07-18T15:11:40.000Z',
          state: 'STANDBY',
          method: '단독',
        }}
      />
    </List>
  );
};
