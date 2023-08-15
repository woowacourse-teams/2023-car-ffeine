import FlexBox from '@common/FlexBox';

import ChargerCard from '@ui/StationDetailsWindow/chargers/ChargerCard';

import type { Charger } from '@type';

export interface ChargerListProps {
  chargers: Charger[];
}

const ChargerList = ({ chargers }: ChargerListProps) => {
  return (
    <FlexBox my={3}>
      {chargers.map((charger, index) => (
        <ChargerCard key={index} charger={charger} />
      ))}
    </FlexBox>
  );
};

export default ChargerList;
