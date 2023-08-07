import type { Meta } from '@storybook/react';

import FlexBox from '@common/FlexBox';

import type { StationDetailsViewProps } from '@ui/StationDetailsWindow/StationDetailsView';
import StationDetailsView from '@ui/StationDetailsWindow/StationDetailsView';
import StationDetailsViewSkeleton from '@ui/StationDetailsWindow/StationDetailsViewSkeleton';

const meta = {
  title: 'UI/StationDetailsView',
  component: StationDetailsView,
  tags: ['autodocs'],
  args: {
    station: {
      stationId: '99',
      stationName: '박스터 충전소',
      companyName: 'CARffeine',
      contact: '02-1234-5678',
      chargers: [
        {
          type: 'DC_AC_3PHASE',
          price: 200,
          capacity: 3,
          latestUpdateTime: '2023-07-18T15:11:40.000Z',
          state: 'STANDBY',
          method: '단독',
        },
        {
          type: 'DC_COMBO',
          price: 300,
          capacity: 200,
          latestUpdateTime: '2023-07-30T03:21:40.000Z',
          state: 'UNDER_INSPECTION',
          method: '단독',
        },
        {
          type: 'DC_AC_3PHASE',
          price: 350,
          capacity: 50,
          latestUpdateTime: '2023-07-01T03:21:40.000Z',
          state: 'CHARGING_IN_PROGRESS',
          method: '동시',
        },
        {
          type: 'AC_SLOW',
          price: 350,
          capacity: 3,
          latestUpdateTime: '2023-07-01T03:21:40.000Z',
          state: 'CHARGING_IN_PROGRESS',
          method: '동시',
        },
        {
          type: 'DC_FAST',
          price: 450,
          capacity: 100,
          latestUpdateTime: '2023-07-01T03:21:40.000Z',
          state: 'STATUS_UNKNOWN',
          method: '동시',
        },
      ],
      isParkingFree: true,
      operatingTime: '평일 09:00~19:00 / 주말 미운영',
      address: '서울 송파구 올림픽로35다길 42',
      detailLocation: '지하 1층 구석탱이 어딘가',
      latitude: 37.599295930415195,
      longitude: 127.45404683387704,
      isPrivate: true,
      stationState: '2023-08-04일부터 충전소 공사합니다.',
      privateReason: '박스터 차주만 충전 가능함',
      reportCount: 1,
    },
  },
  argTypes: {
    station: {
      description: '충전소 데이터를 수정할 수 있습니다.',
    },
  },
} satisfies Meta<typeof StationDetailsView>;

export default meta;

export const Default = (args: StationDetailsViewProps) => {
  return <StationDetailsView {...args} />;
};

export const Skeleton = (args: StationDetailsViewProps) => {
  return (
    <FlexBox>
      <StationDetailsView {...args} />
      <StationDetailsViewSkeleton />
    </FlexBox>
  );
};
