import { useState } from 'react';

import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import ChargerCard from '@ui/StationDetailsWindow/chargers/ChargerCard';

import type { Charger } from '@type';

export interface ChargerListProps {
  chargers: Charger[];
}

const ChargerList = ({ chargers }: ChargerListProps) => {
  const CHARGER_SIZE = 6;
  const [page, setPage] = useState(1);
  const totalChargersSize = chargers.length;
  const availableChargersSize = chargers.filter((charger) => charger.state === 'STANDBY').length;
  const loadedChargersSize = page * CHARGER_SIZE;

  return (
    <>
      <Text variant="subtitle">
        충전기 {totalChargersSize}대 중 {availableChargersSize}대 사용가능
      </Text>
      <FlexBox my={3}>
        {chargers.slice(0, page * CHARGER_SIZE).map((charger, index) => (
          <ChargerCard key={index} charger={charger} />
        ))}
      </FlexBox>
      {totalChargersSize - loadedChargersSize > 0 && (
        <ButtonNext fullWidth size="sm" color="error" onClick={() => setPage((prev) => prev + 1)}>
          충전기 더보기
        </ButtonNext>
      )}
    </>
  );
};

export default ChargerList;
