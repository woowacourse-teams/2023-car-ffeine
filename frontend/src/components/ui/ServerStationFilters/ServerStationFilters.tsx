import { ArrowLeftIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import { useQueryClient } from '@tanstack/react-query';

import { getAPIEndPoint } from '@utils/login';

import { toastActions } from '@stores/layout/toastStore';
import { memberInfoStore } from '@stores/login/memberInfoStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';
import { serverStationFilterAction } from '@stores/station-filters/serverStationFiltersStore';

import { useServerStationFilters } from '@hooks/tanstack-query/station-filters/useServerStationFilters';
import { useServerStationFilterActions } from '@hooks/useServerStationFilterActions';

import Button from '@common/Button';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import ServerStationFiltersSkeleton from '@ui/ServerStationFilters/ServerStationFiltersSkeleton';
import { useNavigationBar } from '@ui/compound/NavigationBar/hooks/useNavigationBar';

import { CONNECTOR_TYPES, COMPANIES } from '@constants/chargers';
import { QUERY_KEY_STATIONS, QUERY_KEY_MEMBER_SELECTED_FILTERS } from '@constants/queryKeys';

import type { Capacity, StationFilters } from '@type';

import FilterSection from './FilterOption';

const ServerStationFilters = () => {
  const queryClient = useQueryClient();
  const { showToast } = toastActions;
  const { data: serverStationFilters, isLoading } = useServerStationFilters();
  const { closeBasePanel } = useNavigationBar();

  const {
    toggleCapacityFilter,
    toggleConnectorTypeFilter,
    toggleCompanyFilter,
    getIsCapacitySelected,
    getIsConnectorTypeSelected,
    getIsCompanySelected,
    resetAllFilters,
  } = useServerStationFilterActions();

  if (isLoading) {
    return <ServerStationFiltersSkeleton />;
  }

  const { connectorTypes, capacities, companies } = serverStationFilters;

  const handleApplySelectedFilters = async () => {
    const APIEndPoint = getAPIEndPoint();
    const memberId = memberInfoStore.getState()?.memberId;
    const memberToken = memberTokenStore.getState();

    const { getAllServerStationFilters, setAllServerStationFilters, resetAllServerStationFilters } =
      serverStationFilterAction;
    const selectedFilters = getAllServerStationFilters();
    const { capacities, companies, connectorTypes } = selectedFilters;

    if (memberId === undefined) {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATIONS] });
      showToast('필터가 적용되었습니다');
      return;
    }

    try {
      const stationFilters = await fetch(`${APIEndPoint}/members/${memberId}/filters`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${memberToken}`,
        },
        body: JSON.stringify({
          filters: [
            ...capacities.map((capacity) => ({
              type: 'capacity',
              name: capacity,
            })),
            ...companies.map((company) => ({
              type: 'company',
              name: company,
            })),
            ...connectorTypes.map((connectorType) => ({
              type: 'connectorType',
              name: connectorType,
            })),
          ],
        }),
      }).then<StationFilters>((response) => response.json());

      setAllServerStationFilters(stationFilters);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATIONS] });

      showToast('필터가 적용되었습니다');
    } catch {
      const stationFilters = queryClient.getQueryData<StationFilters>([
        QUERY_KEY_MEMBER_SELECTED_FILTERS,
      ]);
      resetAllServerStationFilters(stationFilters);

      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATIONS] });

      showToast('필터 적용에 실패했습니다', 'error');
    }
  };

  return (
    <FlexBox
      width={34}
      height={'100vh'}
      alignItems={'center'}
      direction={'column'}
      background={'white'}
      css={[overFlowCss, borderCss]}
      nowrap={true}
      noRadius={'all'}
    >
      <FlexBox
        width={34}
        height={8}
        justifyContent="between"
        alignItems="center"
        css={filterHeaderCss}
      >
        <ButtonNext onClick={closeBasePanel} noTheme aria-label="필터 선택창 닫기">
          <ArrowLeftIcon width="2.8rem" stroke="#333" />
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
