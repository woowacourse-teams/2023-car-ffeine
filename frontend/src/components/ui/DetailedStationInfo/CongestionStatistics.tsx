import { css } from 'styled-components';

import { useState } from 'react';

import { useStationCongestionStatistics } from '@hooks/useStationCongestionStatistics';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import StatisticsGraph from '@ui/StatisticsGraph';

import { ENGLISH_DAYS } from '@constants';

const CongestionStatistics = () => {
  const { data: congestionStatistics, isFetching } = useStationCongestionStatistics();
  const [chargingSpeed, setChargingSpeed] = useState<'QUICK' | 'STANDARD'>('QUICK');

  // TODO: 그래프 모양 로딩 스켈레톤 추가하기
  if (isFetching) {
    return (
      <FlexBox width="100%" height="50rem" justifyContent="center" alignItems="center">
        <Text variant="h2">⌛</Text>
      </FlexBox>
    );
  }

  return (
    <FlexBox direction="column" gap={4}>
      <FlexBox justifyContent="between">
        <Button
          background={chargingSpeed === 'QUICK' && '#0064ff'}
          width="48%"
          outlined
          css={buttonBorderColorCss}
          onClick={() => setChargingSpeed('QUICK')}
        >
          <Text variant="h6" color={chargingSpeed === 'QUICK' && '#fff'}>
            급속 보기
          </Text>
        </Button>
        <Button
          background={chargingSpeed === 'STANDARD' && '#0064ff'}
          color={chargingSpeed === 'STANDARD' && '#fff'}
          width="48%"
          outlined
          css={buttonBorderColorCss}
          onClick={() => setChargingSpeed('STANDARD')}
        >
          <Text variant="h6" color={chargingSpeed === 'STANDARD' && '#fff'}>
            완속 보기
          </Text>
        </Button>
      </FlexBox>
      <StatisticsGraph
        statistics={congestionStatistics.congestion[chargingSpeed]}
        menus={[...ENGLISH_DAYS]}
        align="column"
      />
    </FlexBox>
  );
};

const buttonBorderColorCss = css`
  border: 1px solid #d4d4d4;
`;

export default CongestionStatistics;
