import { css, styled } from 'styled-components';

import { getLocalStorage } from '@utils/storage';

import Alert from '@common/Alert';
import Box from '@common/Box';
import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import ChargerCard from '@ui/DetailedStationInfo/ChargerCard';

import { BASE_URL, LOCAL_KEY_TOKEN } from '@constants';

import type { StationDetails } from '../../../types';

export interface DetailedStationProps {
  station: StationDetails;
}

const DetailedStation = ({ station }: DetailedStationProps) => {
  const {
    stationId,
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

  const reportStation = (stationId: number) => {
    alert(`report this station's information: ${stationId}`);
  };

  const reportCharger = async (stationId: number) => {
    alert(`report this station's chargers: ${stationId}`);
    const token = getLocalStorage<number>(LOCAL_KEY_TOKEN, -1);
    await fetch(`${BASE_URL}/stations/${stationId}/reports`, {
      method: 'POST',
      body: JSON.stringify({ stationId }),
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <Box px={2} pt={10} css={containerCss}>
      <Box mt={10} mb={5} px={1}>
        <Text variant="label">{companyName}</Text>
        <Box my={1}>
          <Text variant="title">{stationName}</Text>
        </Box>
        <Text variant="subtitle">{address}</Text>
        {detailLocation && <Text variant="caption">{detailLocation}</Text>}
      </Box>
      <hr />

      {stationState && <Alert color="warning" text={`[공지] ${stationState}`} />}

      <Box px={1}>
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
            {isPrivate || privateReason
              ? `사용 제한됨 (사유: ${privateReason})`
              : '누구나 사용가능'}
          </Text>
        </Box>
      </Box>

      <FlexBox justifyContent="center">
        <Button size="sm" onClick={() => reportStation(stationId)}>
          📝 올바른 충전소 정보 제보하기
        </Button>
      </FlexBox>

      <hr />

      <FlexBox>
        {chargers.map((charger, index) => (
          <ChargerCard key={index} charger={charger} />
        ))}
      </FlexBox>

      <FlexBox justifyContent="center">
        <Button size="sm" onClick={() => reportCharger(stationId)}>
          📢 실제 충전기 상태와 일치하지 않는 충전소에요
        </Button>
      </FlexBox>
      {reportCount > 0 && (
        <Box my={1}>
          <Alert color={'secondary'} text={`충전 상태 불일치 신고가 ${reportCount}번 접수됐어요`} />
        </Box>
      )}
    </Box>
  );
};

const containerCss = css`
  width: 34rem;
  height: 100vh;
  background-color: white;
  box-shadow: 1px 1px 2px gray;
`;

export default DetailedStation;
