import type { Meta } from '@storybook/react';

import type { ChargerCardProps } from '@ui/DetailedStationInfo/ChargerCard';
import ChargerCard from '@ui/DetailedStationInfo/ChargerCard';

const meta = {
  title: 'UI/ChargerCard',
  component: ChargerCard,
  tags: ['autodocs'],
  args: {
    charger: {
      type: 'DC_AC_3PHASE',
      price: 200,
      capacity: 3,
      latestUpdateTime: '2023-07-18T15:11:40.000Z',
      state: 'STANDBY',
      method: '단독',
    },
  },
  argTypes: {
    charger: {
      description: '충전기 데이터를 수정할 수 있습니다.',
    },
  },
} satisfies Meta<typeof ChargerCard>;

export default meta;

export const Default = (args: ChargerCardProps) => {
  return <ChargerCard {...args} />;
};
