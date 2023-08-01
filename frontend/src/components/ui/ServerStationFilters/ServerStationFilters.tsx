import { css } from 'styled-components';

import { useExternalState } from '@utils/external-state';

import { serverStationFiltersOpenStore } from '@stores/navItemsOpenStore';

import { useServerStationFilters } from '@hooks/useServerStationFilters';
import { useUpdateStations } from '@hooks/useUpdateStations';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import { windowPositionTriggeredByLnb } from '@style';

import { CHARGER_TYPES, CAPACITIES, COMPANY_NAME } from '@constants';

import FilterSection from './FilterOption';

import type { ChargerType } from 'types';

const paddingCss = css`
  padding-top: 1.5rem;
`;

const overFlowCss = css`
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const borderCss = css`
  border-right: 0.1rem solid \#dddddd;
`;

const buttonCss = css`
  width: 100%;
  height: 6rem;

  position: sticky;
  bottom: 0;

  flex-shrink: 0;

  color: \#fff;
`;

const ServerStationFilters = () => {
  const [isOpen, setIsOpen] = useExternalState(serverStationFiltersOpenStore);

  const { updateStations } = useUpdateStations();

  const {
    toggleSelectCapacityFilter,
    toggleSelectChargerTypesFilter,
    toggleSelectCompanyNamesFilter,
    getIsCapacitySelected,
    getIsChargerTypeSelected,
    getIsCompanyNameSelected,
  } = useServerStationFilters();

  const handleApplySelectedFilters = () => {
    updateStations();
    setIsOpen(false);
  };

  if (!isOpen) return <></>;

  return (
    <FlexBox
      width={34}
      height={'100vh'}
      alignItems={'center'}
      direction={'column'}
      background={'white'}
      css={`
        ${windowPositionTriggeredByLnb}${overFlowCss}${borderCss}${paddingCss}
      `}
      nowrap={true}
      noRadius={'all'}
      gap={6}
    >
      <FilterSection
        title={'커넥터 타입'}
        filterOptionNames={Object.values(CHARGER_TYPES)}
        filterOptionValues={Object.keys(CHARGER_TYPES) as ChargerType[]}
        toggleSelectFilter={toggleSelectChargerTypesFilter}
        getIsFilterSelected={getIsChargerTypeSelected}
      />
      <FilterSection
        title={'충전 속도(kW)'}
        filterOptionNames={[...CAPACITIES]}
        filterOptionValues={[...CAPACITIES]}
        filterButtonVariant={'sm'}
        toggleSelectFilter={toggleSelectCapacityFilter}
        getIsFilterSelected={getIsCapacitySelected}
      />
      <FilterSection
        title={'충전 사업자'}
        filterOptionNames={Object.values(COMPANY_NAME)}
        filterOptionValues={Object.values(COMPANY_NAME)}
        toggleSelectFilter={toggleSelectCompanyNamesFilter}
        getIsFilterSelected={getIsCompanyNameSelected}
      />
      <Button
        background={'#0064FF'}
        css={buttonCss}
        noRadius={'all'}
        onClick={handleApplySelectedFilters}
      >
        <Text variant={'h6'}>적용하기</Text>
      </Button>
    </FlexBox>
  );
};

export default ServerStationFilters;
