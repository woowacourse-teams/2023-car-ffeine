import { css } from 'styled-components';

import { useState } from 'react';

import Alert from '@common/Alert';
import Box from '@common/Box';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import ShowHideButton from '@ui/ShowHideButton';
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
  const INITIAL_PAGE = 1;

  const [page, setPage] = useState(INITIAL_PAGE);
  const totalChargersSize = chargers.length;
  const availableChargersSize = chargers.filter((charger) => charger.state === 'STANDBY').length;
  const loadedChargers = chargers.slice(0, page * CHARGER_SIZE);
  const loadedChargersSize = page * CHARGER_SIZE;
  const isReported = reportCount > 0;
  const shouldShowMoreButton = totalChargersSize - loadedChargersSize > 0;

  const handleShowMoreChargers = () => {
    setPage((prev) => prev + 1);
  };

  const handleResetChargesPage = () => {
    setPage(INITIAL_PAGE);
  };

  return (
    <Box mb={12}>
      <Text tag="h3" fontSize={1.8} weight="bold" mt={8} mb={1.5}>
        충전기
      </Text>
      <FlexBox justifyContent="between" alignItems="center">
        <Text>
          {totalChargersSize}대 중 <strong>{availableChargersSize}대</strong> 사용가능
        </Text>
        <ChargerReportButton stationId={stationId} />
      </FlexBox>
      {isReported && (
        <Alert
          color="warning"
          text={`충전기 고장 신고가 ${reportCount}번 접수됐어요`}
          css={alertCss}
        />
      )}
      <FlexBox my={3} rowGap={2} justifyContent="between">
        {loadedChargers.map((charger, index) => (
          <ChargerCard key={index} charger={charger} />
        ))}
      </FlexBox>
      {shouldShowMoreButton ? (
        <ShowHideButton onClick={handleShowMoreChargers} />
      ) : (
        page !== INITIAL_PAGE && <ShowHideButton name="닫기" onClick={handleResetChargesPage} />
      )}
    </Box>
  );
};

const alertCss = css`
  padding: 1rem 0 1.2rem;
  text-align: center;
  margin-top: 1rem;
`;

export default ChargerList;
