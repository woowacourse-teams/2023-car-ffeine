import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import type { CHARGER_TYPES } from '@constants/chargers';

import type { Capacity, ChargerType, CompanyName } from 'types';

interface FilterSectionProps {
  title: string;
  filterButtonVariant?: 'xs' | 'sm';
  filterOptionNames:
    | (typeof CHARGER_TYPES)[keyof typeof CHARGER_TYPES][]
    | Capacity[]
    | CompanyName[];
  filterOptionValues: ChargerType[] | Capacity[] | CompanyName[];
  toggleSelectFilter: (filter: ChargerType | Capacity | CompanyName) => void;
  getIsFilterSelected: (filter: ChargerType | Capacity | CompanyName) => boolean;
}

const FilterSection = ({
  title,
  filterOptionNames,
  filterOptionValues,
  filterButtonVariant = 'sm',
  toggleSelectFilter,
  getIsFilterSelected,
}: FilterSectionProps) => {
  return (
    <FlexBox width={30} direction={'column'}>
      <Text variant={'h6'} mb={1}>
        {title}
      </Text>
      <FlexBox gap={2}>
        {filterOptionNames.map((filterOption, index) => (
          <ButtonNext
            key={index}
            variant={getIsFilterSelected(filterOptionValues[index]) ? 'contained' : 'outlined'}
            size={filterButtonVariant}
            onClick={() => toggleSelectFilter(filterOptionValues[index])}
            pill
          >
            <Text variant={'subtitle'}>{filterOption}</Text>
          </ButtonNext>
        ))}
      </FlexBox>
    </FlexBox>
  );
};

export default FilterSection;
