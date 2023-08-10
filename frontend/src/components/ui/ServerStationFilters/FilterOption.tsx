import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import type { CHARGER_TYPES } from '@constants/chargers';
import type { COMPANY_NAME } from '@constants/chargers';

import type { Capacity, ChargerType } from '@type/chargers';
import type { CompanyName } from '@type/stations';

interface FilterSectionProps {
  title: string;
  filterButtonVariant?: 'xs' | 'sm';
  filterOptionNames:
    | (typeof CHARGER_TYPES)[keyof typeof CHARGER_TYPES][]
    | Capacity[]
    | CompanyName[];
  filterOptionValues: ChargerType[] | `${Capacity}.00`[] | (keyof typeof COMPANY_NAME)[];
  toggleSelectFilter: (filter: ChargerType | `${Capacity}.00` | keyof typeof COMPANY_NAME) => void;
  getIsFilterSelected: (
    filter: ChargerType | `${Capacity}.00` | keyof typeof COMPANY_NAME
  ) => boolean;
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
      <FlexBox justifyContent="between">
        <Text variant={'h6'} mb={1}>
          {title}
        </Text>
        <Text variant="caption">*중복선택 가능</Text>
      </FlexBox>
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
