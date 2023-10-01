import type { Meta } from '@storybook/react';
import styled from 'styled-components';

import Text from '@common/Text';

import type { Charger, StationDetails } from '@type';

import type { StationInfoProps } from './StationInfo';
import StationInfo from './StationInfo';

const meta = {
  title: 'UI/StationInfo',
  component: StationInfo,
  args: {
    stationDetails: {
      address: '서울특별시 강남구 테헤란로87길 22',
      chargers: [
        {
          capacity: 50,
          latestUpdateTime: '2021-08-01T00:00:00.000Z',
          method: '단독',
          price: 0,
          state: 'STANDBY',
          type: 'DC_FAST',
        },
      ] as Charger[],
      companyName: '에스트래픽',
      contact: '1566-1704',
      detailLocation: '지하 4층 08번 기둥',
      isParkingFree: false,
      isPrivate: true,
      latitude: 0,
      longitude: 0,
      operatingTime: '24시간 이용가능',
      privateReason: '',
      reportCount: 0,
      stationId: 'ab12345',
      stationName: '한국도심공항',
      stationState: '내일부터 공사합니다.',
    } as StationDetails,
    handleCloseStationWindow: () => {
      alert('마커 위의 충전소 정보창이 닫혔습니다.');
    },
    handleOpenStationDetail: () => {
      alert('충전소 상세 정보창이 열렸습니다.');
    },
  },
  argTypes: {
    handleCloseStationWindow: {
      description: '마커 위의 충전소 정보창을 닫을 수 있습니다.',
    },
    handleOpenStationDetail: {
      description: '충전소 상세 정보창을 열 수 있습니다. 모바일에서만 보이는 버튼입니다.',
    },
  },
} satisfies Meta<typeof StationInfo>;

export default meta;

export const Default = (args: StationInfoProps) => {
  return (
    <>
      <Container>
        <StationInfo {...args} />
      </Container>
      <Text mt={5}>위 컨테이너는 실제 구글 api 디자인을 가져온 것입니다.</Text>
    </>
  );
};

const Container = styled.div`
  width: 32rem;
  box-sizing: border-box;
  overflow: hidden;
  background-color: white;
  border-radius: 8px;
  //padding: 12px;
  box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.3);
`;
