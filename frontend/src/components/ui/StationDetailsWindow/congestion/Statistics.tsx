import { useState } from 'react';

import { useStationCongestionStatistics } from '@hooks/tanstack-query/station-details/useStationCongestionStatistics';

import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';

import Error from '@ui/Error';
import ShowHideButton from '@ui/ShowHideButton';
import StatisticsGraph from '@ui/StatisticsGraph';

import type { CHARGING_SPEED } from '@constants/chargers';
import { SHORT_ENGLISH_DAYS_OF_WEEK } from '@constants/congestion';

import type { LongEnglishDaysOfWeek } from '@type';

interface Props {
  stationId: string;
  setIsStatisticsOpen: (pram: boolean) => void;
  dayOfWeek: LongEnglishDaysOfWeek;
  onChangeDayOfWeek: (dayOfWeek: LongEnglishDaysOfWeek) => void;
}

const Statistics = ({ stationId, setIsStatisticsOpen, dayOfWeek, onChangeDayOfWeek }: Props) => {
  const {
    data: congestionStatistics,
    isLoading,
    isError,
    refetch,
  } = useStationCongestionStatistics(stationId, dayOfWeek);
  const [chargingSpeed, setChargingSpeed] = useState<keyof typeof CHARGING_SPEED>('standard');

  const handleRetry = () => {
    refetch();
  };

  if (isError) {
    return (
      <Error
        title="앗"
        message="데이터를 불러오는데 실패했어요."
        subMessage="잠시 후 다시 시도해주세요."
        handleRetry={handleRetry}
        minHeight={`${49.3 + 2.2}rem`}
      />
    );
  }

  return (
    <>
      <FlexBox direction="column" gap={4} mb={3.5}>
        <StatisticsGraph
          statistics={congestionStatistics?.congestion[chargingSpeed]}
          menus={[...SHORT_ENGLISH_DAYS_OF_WEEK]}
          align="column"
          dayOfWeek={dayOfWeek}
          onChangeDayOfWeek={onChangeDayOfWeek}
          isLoading={isLoading}
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
