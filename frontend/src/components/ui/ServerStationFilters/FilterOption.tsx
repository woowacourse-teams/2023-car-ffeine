import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import type { CHARGER_TYPES } from './../../../constants/index';

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
  filterButtonVariant = 'xs',
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
          <Button
            key={index}
            size={filterButtonVariant}
            outlined={true}
            onClick={() => toggleSelectFilter(filterOptionValues[index])}
            background={getIsFilterSelected(filterOptionValues[index]) && '#c8c8c8'}
          >
            <Text variant={'subtitle'}>{filterOption}</Text>
          </Button>
        ))}
      </FlexBox>
    </FlexBox>
  );
};

export default FilterSection;
