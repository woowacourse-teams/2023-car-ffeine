import { styled } from 'styled-components';

import Alert from '@common/Alert';
import Box from '@common/Box';
import List from '@common/List';
import Text from '@common/Text';

import ChargerCard from '@ui/DetailedStationInfo/ChargerCard';

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

      {stationState && <Alert color={'warning'} text={`[공지] ${stationState}`} />}

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

      <List>
        {chargers.map((charger, index) => (
          <ChargerCard key={index} charger={charger} />
        ))}
      </List>

      {reportCount > 0 && (
        <Alert color={'secondary'} text={`최근 충전기 고장 신고가 ${reportCount}번 접수됐어요`} />
      )}
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
