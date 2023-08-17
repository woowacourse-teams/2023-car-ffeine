import { ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import { memberTokenStore } from '@stores/login/memberTokenStore';

import { useServerStationFilters } from '@hooks/tanstack-query/station-filters/useServerStationFilters';
import { useServerStationFilterStoreActions } from '@hooks/useServerStationFilterActions';

import Button from '@common/Button';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import ServerStationFiltersSkeleton from '@ui/ServerStationFilters/ServerStationFiltersSkeleton';
import { useNavigationBar } from '@ui/compound/NavigationBar/hooks/useNavigationBar';

import { MOBILE_BREAKPOINT, NAVIGATOR_PANEL_WIDTH } from '@constants';
import { CONNECTOR_TYPES, COMPANIES } from '@constants/chargers';

import type { Capacity } from '@type';

import FilterSection from './FilterOption';
import { useServerStationFiltersComponentActions } from './hooks/useServerStationFiltersComponentActions';

const ServerStationFilters = () => {
  const { data: serverStationFilters, isLoading } = useServerStationFilters();
  const { closeBasePanel } = useNavigationBar();
  const { handleStationsRefetch, submitMemberFilters } = useServerStationFiltersComponentActions();
  const {
    toggleCapacityFilter,
    toggleConnectorTypeFilter,
    toggleCompanyFilter,
    getIsCapacitySelected,
    getIsConnectorTypeSelected,
    getIsCompanySelected,
    resetAllFilters,
  } = useServerStationFilterStoreActions();

  if (isLoading) {
    return <ServerStationFiltersSkeleton />;
  }

  const { connectorTypes, capacities, companies } = serverStationFilters;

  const handleApplySelectedFilters = async () => {
    const isLoggedOutUser = memberTokenStore.getState() === '';

    if (isLoggedOutUser) {
      handleStationsRefetch();
      return;
    }

    submitMemberFilters();
  };

  return (
    <FlexBox css={[overFlowCss, borderCss, containerCss]} nowrap={true} noRadius={'all'}>
      <FlexBox
        width={NAVIGATOR_PANEL_WIDTH}
        height={8}
        justifyContent="between"
        alignItems="center"
        css={[filterHeaderCss, filterContainerCss]}
      >
        <ButtonNext onClick={closeBasePanel} noTheme aria-label="필터 선택창 닫기">
          <XMarkIcon width="2.8rem" stroke="#333" />
        </ButtonNext>
        <Text variant="h5">필터</Text>
        <ButtonNext onClick={resetAllFilters} noTheme aria-label="모든 필터 지우기 버튼">
          <ArrowPathIcon width="2.8rem" stroke="#333" />
        </ButtonNext>
      </FlexBox>
      <FilterSection
        title={'커넥터 타입'}
        filterOptionNames={connectorTypes.map((connectorType) => CONNECTOR_TYPES[connectorType])}
        filterOptionValues={connectorTypes}
        toggleSelectFilter={toggleConnectorTypeFilter}
        getIsFilterSelected={getIsConnectorTypeSelected}
      />
      <FilterSection
        title={'충전 속도(kW)'}
        filterOptionNames={[...capacities.map((capacity) => Number(capacity))] as Capacity[]}
        filterOptionValues={[...capacities]}
        filterButtonVariant={'sm'}
        toggleSelectFilter={toggleCapacityFilter}
        getIsFilterSelected={getIsCapacitySelected}
      />
      <FilterSection
        title={'충전 사업자'}
        filterOptionNames={companies.map((companyKey) => COMPANIES[companyKey])}
        filterOptionValues={[...companies]}
        toggleSelectFilter={toggleCompanyFilter}
        getIsFilterSelected={getIsCompanySelected}
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

export const containerCss = css`
  width: ${NAVIGATOR_PANEL_WIDTH}rem;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  background-color: #fff;

  z-index: 9999;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 100vw;
  }
`;

export const filterContainerCss = css`
  width: ${NAVIGATOR_PANEL_WIDTH};
  height: 8rem;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: calc(100vw - 2rem);
  }
`;

export const overFlowCss = css`
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const borderCss = css`
  outline: 1.5px solid #e1e4eb;
`;

export const buttonCss = css`
  width: 100%;
  height: 6rem;

  position: sticky;
  bottom: 0;

  flex-shrink: 0;

  color: #fff;
`;

export const filterHeaderCss = css`
  position: sticky;
  top: 0;
  background-color: #fff;
  flex-shrink: 0;
  padding: 0 2rem;
`;

export default ServerStationFilters;
