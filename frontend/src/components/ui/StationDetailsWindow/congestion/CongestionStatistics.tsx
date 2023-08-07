import { useState } from 'react';

import { useStationCongestionStatistics } from '@hooks/tanstack-query/station-details/useStationCongestionStatistics';

import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import StatisticsGraph from '@ui/StatisticsGraph';

import type { CHARGING_SPEED } from '@constants/chargers';
import { ENGLISH_DAYS } from '@constants/congestion';

const CongestionStatistics = () => {
  const { data: congestionStatistics, isLoading } = useStationCongestionStatistics();
  const [chargingSpeed, setChargingSpeed] = useState<keyof typeof CHARGING_SPEED>('quick');

  // TODO: 그래프 모양 로딩 스켈레톤 추가하기
  if (isLoading) {
    return (
      <FlexBox width="100%" height="50rem" justifyContent="center" alignItems="center">
        <Text variant="h2">⌛</Text>
      </FlexBox>
    );
  }

  return (
    <FlexBox direction="column" gap={4}>
      <FlexBox nowrap>
        <ButtonNext
          variant={chargingSpeed === 'quick' ? 'contained' : 'outlined'}
          size="xs"
          onClick={() => setChargingSpeed('quick')}
          fullWidth
        >
          급속 보기
        </ButtonNext>
        <ButtonNext
          variant={chargingSpeed === 'standard' ? 'contained' : 'outlined'}
          size="xs"
          onClick={() => setChargingSpeed('standard')}
          fullWidth
        >
          완속 보기
        </ButtonNext>
      </FlexBox>
      <StatisticsGraph
        statistics={congestionStatistics.congestion[chargingSpeed]}
        menus={[...ENGLISH_DAYS]}
        align="column"
      />
    </FlexBox>
  );
};

export default CongestionStatistics;
