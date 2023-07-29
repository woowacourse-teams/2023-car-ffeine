import { styled } from 'styled-components';

import Box from '@common/Box';
import Button from '@common/Button';
import Text from '@common/Text';

import { CHARGER_TYPES } from '@constants';

import type { StationDetails } from '../../../types';

export interface DetailedStationProps {
  station: StationDetails;
}

const DetailedStation = ({ station }: DetailedStationProps) => {
  const {
    stationName,
    companyName,
    contact,
    chargers,
    isParkingFree,
    operatingTime,
    address,
    detailLocation,
    isPrivate,
    stationState,
    privateReason,
    reportCount,
  } = station;

  return (
    <Container>
      <Box my={2}>
        <Text variant="label">{companyName}</Text>
        <Box my={1}>
          <Text variant="title">{stationName}</Text>
        </Box>
        <Text variant="subtitle">{address}</Text>
        {detailLocation && <Text variant="caption">{detailLocation}</Text>}
      </Box>
      <hr />

      {stationState && (
        <Box my={1}>
          <Text variant="h6">충전소 공지</Text>
          <Text variant="body">{stationState}</Text>
        </Box>
      )}

      <Box my={1}>
        <Text variant="h6">운영시간</Text>
        <Text variant="body">{operatingTime ?? '운영시간 미확인'}</Text>
      </Box>
      <Box my={1}>
        <Text variant="h6">연락처</Text>
        <Text variant="body">{contact ?? '연락처 없음'}</Text>
      </Box>
      <Box my={1}>
        <Text variant="h6">주차비</Text>
        <Text variant="body">{isParkingFree ? '무료' : '유료'}</Text>
      </Box>
      <Box my={1}>
        <Text variant="h6">사용 제한 여부</Text>
        <Text variant="body">
          {isPrivate || privateReason ? `사용 제한됨 (사유: ${privateReason})` : '누구나 사용가능'}
        </Text>
      </Box>

      <hr />

      {chargers.map((data, index) => {
        const { type, price, capacity, latestUpdateTime, state, method } = data;

        return (
          <ChargerContainer key={index}>
            <li>{CHARGER_TYPES[type as keyof typeof CHARGER_TYPES]}</li>
            <li>가격: {price}</li>
            <li>{capacity >= 50 ? '급속' : '완속'}</li>
            {latestUpdateTime && <li>{String(latestUpdateTime)}</li>}
            <li>충전기 상태: {state}</li>
            {method && <li>{method}</li>}
          </ChargerContainer>
        );
      })}

      <div>누적 고장 신고 횟수: {reportCount}회</div>
    </Container>
  );
};

const Container = styled.div`
  max-width: 41rem;
  padding: 10px;
  background-color: white;
  box-shadow: 1px 1px 2px gray;
`;
const ChargerContainer = styled.ul`
  border: 1px solid #000;
`;
export default DetailedStation;
