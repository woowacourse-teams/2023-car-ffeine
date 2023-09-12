import {
  ChartBarSquareIcon,
  ChevronDownIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

import { useState } from 'react';

import { useStationCongestionStatistics } from '@hooks/tanstack-query/station-details/useStationCongestionStatistics';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import ShowHideButton from '@ui/ShowHideButton';
import CongestionStatisticsSkeleton from '@ui/StationDetailsWindow/congestion/CongestionStatisticsSkeleton';
import StatisticsGraph from '@ui/StatisticsGraph';

import type { CHARGING_SPEED } from '@constants/chargers';
import { ENGLISH_DAYS } from '@constants/congestion';

interface CongestionStatisticsProps {
  stationId: string;
}

const CongestionStatistics = ({ stationId }: CongestionStatisticsProps) => {
  const { data: congestionStatistics, isLoading } = useStationCongestionStatistics(stationId);
  const [chargingSpeed, setChargingSpeed] = useState<keyof typeof CHARGING_SPEED>('standard');
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);

  if (isLoading) {
    return <CongestionStatisticsSkeleton />;
  }

  return (
    <Box my={5}>
      <FlexBox justifyContent="between" alignItems="center" mb={3}>
        <Text fontSize={1.8} weight="bold">
          충전소 시간별 혼잡도
        </Text>
        <Text>
          <InformationCircleIcon width={24} stroke="#747474" />
        </Text>
      </FlexBox>
      {isStatisticsOpen ? (
        <>
          <FlexBox direction="column" gap={4} mb={3.5}>
            <StatisticsGraph
              statistics={congestionStatistics.congestion[chargingSpeed]}
              menus={[...ENGLISH_DAYS]}
              align="column"
            />
            <FlexBox nowrap>
              <ButtonNext
                variant={chargingSpeed === 'standard' ? 'contained' : 'outlined'}
                size="xs"
                onClick={() => setChargingSpeed('standard')}
                fullWidth
              >
                완속 충전기 그룹
              </ButtonNext>
              <ButtonNext
                variant={chargingSpeed === 'quick' ? 'contained' : 'outlined'}
                size="xs"
                onClick={() => setChargingSpeed('quick')}
                fullWidth
              >
                급속 충전기 그룹
              </ButtonNext>
            </FlexBox>
          </FlexBox>
          <ShowHideButton name="닫기" onClick={() => setIsStatisticsOpen(false)} />
        </>
      ) : (
        <ButtonNext onClick={() => setIsStatisticsOpen(true)} fullWidth size="sm" p={2}>
          <FlexBox justifyContent="center" alignItems="center" columnGap={2}>
            <ChartBarSquareIcon width={24} />
            <p>시간별 혼잡도 확인 (BETA)</p>
            <ChevronDownIcon width={20} />
          </FlexBox>
        </ButtonNext>
      )}
    </Box>
  );
};

export default CongestionStatistics;
