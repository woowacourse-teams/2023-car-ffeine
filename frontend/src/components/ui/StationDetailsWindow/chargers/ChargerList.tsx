import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { css } from 'styled-components';

import { useState } from 'react';

import Alert from '@common/Alert';
import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import ChargerCard from '@ui/StationDetailsWindow/chargers/ChargerCard';

import type { Charger } from '@type';

import ChargerReportButton from '../reports/charger/ChargerReportButton';

export interface ChargerListProps {
  chargers: Charger[];
  stationId: string;
  reportCount: number;
}

const ChargerList = ({ chargers, stationId, reportCount }: ChargerListProps) => {
  const CHARGER_SIZE = 6;
  const [page, setPage] = useState(1);
  const totalChargersSize = chargers.length;
  const availableChargersSize = chargers.filter((charger) => charger.state === 'STANDBY').length;
  const loadedChargersSize = page * CHARGER_SIZE;

  const handleShowMoreChargers = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <Text tag="h3" fontSize={1.8} weight="bold" mt={8} mb={1.5}>
        충전기
      </Text>
      <FlexBox justifyContent="between" alignItems="center">
        <Text>
          {totalChargersSize}대 중 <strong>{availableChargersSize}대</strong> 사용가능
        </Text>
        <ChargerReportButton stationId={stationId} />
      </FlexBox>
      {reportCount > 0 && (
        <Alert
          color="warning"
          text={`충전기 고장 신고가 ${reportCount}번 접수됐어요`}
          css={alertCss}
        />
      )}
      <FlexBox my={3} rowGap={2} justifyContent="between">
        {chargers.slice(0, page * CHARGER_SIZE).map((charger, index) => (
          <ChargerCard key={index} charger={charger} />
        ))}
      </FlexBox>
      {totalChargersSize - loadedChargersSize > 0 && (
        <Button css={MoreButtonContainer} onClick={handleShowMoreChargers}>
          <FlexBox justifyContent="center">
            <Text>더보기</Text>
            <ChevronDownIcon width={20} />
          </FlexBox>
        </Button>
      )}
    </>
  );
};

const alertCss = css`
  padding: 1rem 0 1.2rem;
  text-align: center;
  margin-top: 1rem;
`;

const MoreButtonContainer = css`
  width: 100%;

  & svg {
    padding-top: 2px;
  }
`;

export default ChargerList;
