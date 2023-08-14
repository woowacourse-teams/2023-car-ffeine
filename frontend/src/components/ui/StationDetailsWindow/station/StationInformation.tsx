import styled from 'styled-components';

import Box from '@common/Box';
import Text from '@common/Text';

import type { StationDetails } from '@type';

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
    <Box>
      <Box>
        <Text variant="label" mb={1}>
          {companyName}
        </Text>
        <Text variant="title" mb={1}>
          {stationName}
        </Text>
        <Text variant="subtitle" mb={2}>
          {address?.length > 0 ? address : '도로명주소 없음'}
        </Text>
        <Text variant="caption" mb={1}>
          {detailLocation?.length > 0 ? detailLocation : '상세주소 없음'}
        </Text>
      </Box>
      <Divider />
      <Box>
        <Box my={2}>
          <Text variant="subtitle" mb={1}>
            운영시간
          </Text>
          <Text variant="label">
            {operatingTime?.length > 0 ? operatingTime : '운영시간 미확인'}
          </Text>
        </Box>

        <Box my={2}>
          <Text variant="subtitle" mb={1}>
            연락처
          </Text>
          <Text variant="label">{contact?.length > 0 ? contact : '연락처 없음'}</Text>
        </Box>

        <Box my={2}>
          <Text variant="subtitle" mb={1}>
            주차비
          </Text>
          <Text variant="label">{isParkingFree ? '무료' : '유료'}</Text>
        </Box>

        <Box my={2}>
          <Text variant="subtitle" mb={1}>
            사용 제한 여부
          </Text>
          <Text variant="label">
            {isPrivate || privateReason
              ? `사용 제한됨 (사유: ${privateReason?.length > 0 ? privateReason : '없음'})`
              : '누구나 사용가능'}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

const Divider = styled.hr`
  margin: 1.5rem 0 1.5rem 0;
`;

export default StationInformation;
