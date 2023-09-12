import { useState } from 'react';

import { useStationCongestionStatistics } from '@hooks/tanstack-query/station-details/useStationCongestionStatistics';

import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';

import ShowHideButton from '@ui/ShowHideButton';
import StatisticsGraph from '@ui/StatisticsGraph';

import type { CHARGING_SPEED } from '@constants/chargers';
import { ENGLISH_DAYS_OF_WEEK_SHORT_NAME } from '@constants/congestion';

import CongestionStatisticsSkeleton from './CongestionStatisticsSkeleton';

interface Props {
  stationId: string;
  setIsStatisticsOpen: (pram: boolean) => void;
}

const Statistics = ({ stationId, setIsStatisticsOpen }: Props) => {
  const { data: congestionStatistics, isLoading } = useStationCongestionStatistics(stationId);
  const [chargingSpeed, setChargingSpeed] = useState<keyof typeof CHARGING_SPEED>('standard');

  if (isLoading) {
    return <CongestionStatisticsSkeleton />;
  }

  return (
    <>
      <FlexBox direction="column" gap={4} mb={3.5}>
        <StatisticsGraph
          statistics={congestionStatistics.congestion[chargingSpeed]}
          menus={[...ENGLISH_DAYS_OF_WEEK_SHORT_NAME]}
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
  );
};

export default Statistics;
