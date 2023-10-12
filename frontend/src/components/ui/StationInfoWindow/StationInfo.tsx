import { XMarkIcon } from '@heroicons/react/24/outline';

import type { MouseEvent } from 'react';
import { HiChevronRight } from 'react-icons/hi2';

import { MARKER_COLORS } from '@marker/SmallMediumDeltaAreaMarkerContainer/components/CarFfeineMarker/CarFfeineMarker.style';

import Box from '@common/Box';
import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import { QUICK_CHARGER_CAPACITY_THRESHOLD } from '@constants/chargers';

import type { Charger, StationDetails } from '@type';

export interface StationInfoProps {
  stationDetails: StationDetails;
  handleOpenStationDetail: () => void;
  handleCloseStationWindow: (event: MouseEvent<HTMLButtonElement>) => void;
}

const getChargerCountsAndAvailability = (chargers: Charger[]) => {
  const isAvailable = chargers.some(({ state }) => state === 'STANDBY');

  const standardChargers = chargers.filter(
    ({ capacity }) => capacity < QUICK_CHARGER_CAPACITY_THRESHOLD
  );
  const quickChargers = chargers.filter(
    ({ capacity }) => capacity >= QUICK_CHARGER_CAPACITY_THRESHOLD
  );

  const availableStandardChargerCount = standardChargers.filter(
    ({ state }) => state === 'STANDBY'
  ).length;
  const availableQuickChargerCount = quickChargers.filter(
    ({ state }) => state === 'STANDBY'
  ).length;

  const standardChargerCount = standardChargers.length;
  const quickChargerCount = quickChargers.length;

  return {
    isAvailable,
    availableStandardChargerCount,
    availableQuickChargerCount,
    standardChargerCount,
    quickChargerCount,
  };
};

const StationInfo = ({
  stationDetails,
  handleOpenStationDetail,
  handleCloseStationWindow,
}: StationInfoProps) => {
  const { address, chargers, companyName, isParkingFree, isPrivate, stationId, stationName } =
    stationDetails;

  const {
    isAvailable,
    availableStandardChargerCount,
    availableQuickChargerCount,
    standardChargerCount,
    quickChargerCount,
  } = getChargerCountsAndAvailability(chargers);

  const availabilityColor = MARKER_COLORS[isAvailable ? 'available' : 'noAvailable'];

  return (
    <Box tag="article" key={stationId} mt={2} mx={5} mb={3} css={{ fontSize: '10%' }}>
      <FlexBox justifyContent="between" alignItems="center">
        <FlexBox alignItems="center">
          <Box
            width={1.2}
            height={1.2}
            mt={0.5}
            border
            borderWidth={1.5}
            borderColor={availabilityColor.border}
            borderRadius="50%"
            bgColor={availabilityColor.background}
          />

          <Text variant="caption" color={availabilityColor.background}>
            {isAvailable ? '이용 가능' : '이용 불가'}
          </Text>
          <Text tag="span">―</Text>
          {standardChargerCount !== 0 && (
            <Text fontSize={1.2}>
              완속 {availableStandardChargerCount}/{standardChargerCount}
            </Text>
          )}
          {quickChargerCount !== 0 && (
            <Text fontSize={1.2}>
              급속 {availableQuickChargerCount}/{quickChargerCount}
            </Text>
          )}
        </FlexBox>

        <Button mr={-3} onClick={handleCloseStationWindow}>
          <XMarkIcon width={28} />
        </Button>
      </FlexBox>

      <Text tag="h4" align="left" title={stationName} lineClamp={1} fontSize={1.3}>
        {companyName}
      </Text>
      <Text tag="h3" align="left" variant="h5" title={stationName} lineClamp={1}>
        {stationName}
      </Text>
      <Text variant="label" align="left" lineClamp={1} mb={2} color="#585858">
        {address === 'null' || !address ? '주소 미확인' : address}
      </Text>
      <FlexBox columnGap={3}>
        <Text variant="pillbox" align="left">
          {isPrivate ? '이용 제한' : '외부인 개방'}
        </Text>
        <Text variant="pillbox" align="left">
          {isParkingFree ? '무료 주차' : '유료 주차'}
        </Text>
      </FlexBox>

      <Button onClick={handleOpenStationDetail} mt={3} hover>
        <FlexBox alignItems="center">
          <Text variant="label" mb={0.75}>
            상세 정보 보기
          </Text>
          <HiChevronRight />
        </FlexBox>
      </Button>
    </Box>
  );
};

export default StationInfo;
