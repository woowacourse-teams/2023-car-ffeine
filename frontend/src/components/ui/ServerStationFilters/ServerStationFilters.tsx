import { css, styled } from 'styled-components';

import { useExternalState } from '@utils/external-state';

import { serverStationFiltersOpenStore } from '@stores/serverStationFiltersOpenStore';

import { useServerStationFilters } from '@hooks/useServerStationFilters';
import { useUpdateStations } from '@hooks/useUpdateStations';

import Button from '@common/Button';
import Text from '@common/Text';

import { CHARGER_TYPES, CAPACITIES, COMPANY_NAME } from '@constants';

import FilterSection from './FilterOption';

import type { ChargerType } from 'types';

const fixedPositionCss = css`
  position: fixed;
  left: 7rem;
  top: 0;
  z-index: 999;
`;

const paddingCss = css`
  padding-top: 1.5rem;
`;

const overFlowCss = css`
  overflow-y: scroll;
  overflow-x: hidden;
`;

const borderCss = css`
  border-right: 0.1rem solid #ddd;
`;

const buttonCss = css`
  width: 100%;
  height: 6rem;

  color: #fff;
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
    <Container>
      <FilterSection
        title={'커넥터 타입'}
        filterOptionNames={Object.values(CHARGER_TYPES)}
        filterOptionValues={Object.keys(CHARGER_TYPES) as ChargerType[]}
        toggleSelectFilter={toggleSelectChargerTypesFilter}
        getIsFilterSelected={getIsChargerTypeSelected}
      />
      <FilterSection
        title={'충전 속도'}
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
    </Container>
  );
};

const Container = styled.div`
  padding: 0 2.2rem;
  height: 100vh;
  background: #fff;

  & > div {
    margin-bottom: 2.4rem;
  }

  ${fixedPositionCss}
  ${overFlowCss}
  ${borderCss}
  ${paddingCss}
`;

export default ServerStationFilters;
