import styled, { css } from 'styled-components';

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
    privateReason,
  } = station;

  return (
    <Box>
      <Box css={lineHeight}>
        <Text variant="label" mb={1.5}>
          {companyName}
        </Text>
        <Text variant="title" mb={1}>
          {stationName}
        </Text>
        <Text variant="body" mb={1.5}>
          {!address || address?.length === 0 ? '주소 미확인' : address}
        </Text>
        <Text variant="caption" mb={1}>
          {!detailLocation || detailLocation?.length === 0 ? '상세주소 미확인' : detailLocation}
        </Text>
      </Box>
      <Divider />
      <Box>
        <Box my={3}>
          <Text variant="body" weight="bold" mb={2}>
            운영시간
          </Text>
          <Text variant="label" color="#585858">
            {operatingTime?.length > 0 ? operatingTime : '운영시간 미확인'}
          </Text>
        </Box>

        <Box my={3}>
          <Text variant="body" weight="bold" mb={2}>
            연락처
          </Text>
          <Text variant="label" color="#585858">
            {contact?.length > 0 ? contact : '연락처 없음'}
          </Text>
        </Box>

        <Box my={3}>
          <Text variant="body" weight="bold" mb={2}>
            주차비
          </Text>
          <Text variant="label" color="#585858">
            {isParkingFree ? '무료' : '유료'}
          </Text>
        </Box>

        <Box my={3}>
          <Text variant="body" weight="bold" mb={2}>
            사용 제한 여부
          </Text>
          <Text variant="label" color="#585858">
            {isPrivate
              ? `사용 제한됨 (사유: ${privateReason?.length > 0 ? privateReason : '미확인'})`
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

const lineHeight = css`
  line-height: 1.2;
`;

export default StationInformation;
