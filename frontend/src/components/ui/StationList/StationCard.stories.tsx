import { generateRandomChargers } from '@mocks/data';
import type { Meta } from '@storybook/react';

import StationCard from './StationCard';

import type { StationDetails, StationSummary } from 'types';

const meta = {
  title: 'UI/StationCard',
  component: StationCard,
} satisfies Meta<typeof StationCard>;

export default meta;

const mockStationData: StationSummary = {
  address: '상세주소 상세주소 상세주소 상세주소',
  companyName: '회사명 회사명 회사명',
  detailLocation: '지하 주차장 1층',
  isParkingFree: true,
  isPrivate: true,
  latitude: 0,
  longitude: 0,
  operatingTime: '',
  stationId: 1,
  stationName: '충전소 이름 충전소 이름',
  totalCount: 10,
  availableCount: 5,
  chargers: generateRandomChargers(),
};

export const Default = () => {
  return <StationCard station={mockStationData} onClick={() => alert('충전소 클릭됨')} />;
};
