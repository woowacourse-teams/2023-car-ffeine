import type { Meta } from '@storybook/react';

import DetailedStation from '@ui/DetailedStationInfo/DetailedStation';

const meta = {
  title: 'UI/DetailedStation',
  component: DetailedStation,
} satisfies Meta<typeof DetailedStation>;

export default meta;

export const Default = () => {
  return (
    <DetailedStation
      station={{
        stationId: 99,
        stationName: '박스터 충전소',
        companyName: 'CARffeine',
        contact: '02-1234-5678',
        chargers: [
          {
            type: 'DC_AC_3PHASE',
            price: 200,
            capacity: 3,
            latestUpdateTime: new Date('2023-07-18T15:11:40.000Z'),
            state: 'STANDBY',
            method: '단독',
          },
          {
            type: 'DC_COMBO',
            price: 300,
            capacity: 7,
            latestUpdateTime: new Date('2023-07-30T03:21:40.000Z'),
            state: 'UNDER_INSPECTION',
            method: '단독',
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
      }}
    />
  );
};
