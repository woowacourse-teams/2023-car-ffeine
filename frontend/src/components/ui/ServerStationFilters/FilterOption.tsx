import { css } from 'styled-components';

import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import { MOBILE_BREAKPOINT } from '@constants';

import type { Capacity, ConnectorTypeName } from '@type/chargers';
import type { CapaCityBigDecimal, CompanyKey, ConnectorTypeKey } from '@type/serverStationFilter';
import type { CompanyName } from '@type/stations';

interface FilterSectionProps {
  title: string;
  filterOptionNames: ConnectorTypeName[] | Capacity[] | CompanyName[];
  filterOptionValues: ConnectorTypeKey[] | CapaCityBigDecimal[] | CompanyKey[];
  toggleSelectFilter: (filter: ConnectorTypeKey | CapaCityBigDecimal | CompanyKey) => void;
  getIsFilterSelected: (filter: ConnectorTypeKey | CapaCityBigDecimal | CompanyKey) => boolean;
}

const FilterSection = ({
  title,
  filterOptionNames,
  filterOptionValues,
  toggleSelectFilter,
  getIsFilterSelected,
}: FilterSectionProps) => {
  return (
    <FlexBox width={30} direction="column" mb={6} css={containerCss}>
      <FlexBox justifyContent="between">
        <Text variant={'h6'} mb={2}>
          {title}
        </Text>
        <Text variant="caption">중복선택 가능</Text>
      </FlexBox>
      <FlexBox gap={2}>
        {filterOptionNames.map((filterOption, index) => (
          <ButtonNext
            key={index}
            variant={getIsFilterSelected(filterOptionValues[index]) ? 'contained' : 'outlined'}
            size="sm"
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

const containerCss = css`
  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: calc(100vw - 6rem);
  }
`;

export default FilterSection;
