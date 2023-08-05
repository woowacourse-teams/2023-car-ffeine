import Alert from '@common/Alert';
import Box from '@common/Box';
import Text from '@common/Text';

import type { StationDetails } from '../../../types';

export interface StationInformationProps {
  station: StationDetails;
}

const StationInformation = ({ station }: StationInformationProps) => {
  const {
    stationName,
    companyName,
    contact,
    isParkingFree,
    operatingTime,
    address,
    detailLocation,
    isPrivate,
    stationState,
    privateReason,
  } = station;

  return (
    <Box p={3}>
      <Box px={1}>
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
        <Box my={2}>
          <Text variant="h6">운영시간</Text>
          <Text variant="body">{operatingTime ?? '운영시간 미확인'}</Text>
        </Box>
        <Box my={2}>
          <Text variant="h6">연락처</Text>
          <Text variant="body">{contact ?? '연락처 없음'}</Text>
        </Box>
        <Box my={2}>
          <Text variant="h6">주차비</Text>
          <Text variant="body">{isParkingFree ? '무료' : '유료'}</Text>
        </Box>
        <Box my={2}>
          <Text variant="h6">사용 제한 여부</Text>
          <Text variant="body">
            {isPrivate || privateReason
              ? `사용 제한됨 (사유: ${privateReason})`
              : '누구나 사용가능'}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default StationInformation;
