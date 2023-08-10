import { ArrowLeftIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import { useQueryClient } from '@tanstack/react-query';

import { toastActions } from '@stores/layout/toastStore';

import { useServerStationFilters } from '@hooks/tanstack-query/station-filters/useServerStationFilters';
import { useServerStationFilterActions } from '@hooks/useServerStationFilterActions';

import Button from '@common/Button';
import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import { useNavigationBar } from '@ui/compound/NavigationBar/hooks/useNavigationBar';

import type { COMPANY_NAME } from '@constants/chargers';

import type { Capacity } from '@type';

import FilterSection from './FilterOption';

const ServerStationFilters = () => {
  const queryClient = useQueryClient();
  const { showToast } = toastActions;
  const { data: serverStationFilters, isLoading } = useServerStationFilters();
  const { closeBasePanel } = useNavigationBar();

  const {
    toggleSelectCapacityFilter,
    toggleSelectChargerTypesFilter,
    toggleSelectCompanyNamesFilter,
    getIsCapacitySelected,
    getIsChargerTypeSelected,
    getIsCompanyNameSelected,
    resetAllFilter,
  } = useServerStationFilterActions();

  if (isLoading) {
    return <></>;
  }

  const { connectorTypes, capacities, companyNames } = serverStationFilters;

  const handleApplySelectedFilters = () => {
    queryClient.invalidateQueries({ queryKey: ['stations'] });
    showToast('필터가 적용되었습니다');
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
      gap={12}
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
        <ButtonNext onClick={resetAllFilter} noTheme aria-label="모든 필터 지우기 버튼">
          <ArrowPathIcon width="2.8rem" stroke="#333" />
        </ButtonNext>
      </FlexBox>
      <FilterSection
        title={'커넥터 타입'}
        filterOptionNames={connectorTypes.map((connectorType) => connectorType.value)}
        filterOptionValues={connectorTypes.map((connectorType) => connectorType.key)}
        toggleSelectFilter={toggleSelectChargerTypesFilter}
        getIsFilterSelected={getIsChargerTypeSelected}
      />
      <FilterSection
        title={'충전 속도(kW)'}
        filterOptionNames={[...capacities.map(({ capacity }) => Number(capacity))] as Capacity[]}
        filterOptionValues={[...capacities.map(({ capacity }) => capacity)]}
        filterButtonVariant={'sm'}
        toggleSelectFilter={toggleSelectCapacityFilter}
        getIsFilterSelected={getIsCapacitySelected}
      />
      <FilterSection
        title={'충전 사업자'}
        filterOptionNames={companyNames.map(({ value }) => value)}
        filterOptionValues={companyNames.map(({ key }) => key) as (keyof typeof COMPANY_NAME)[]}
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

const overFlowCss = css`
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const borderCss = css`
  outline: 1.5px solid #e1e4eb;
`;

const buttonCss = css`
  width: 100%;
  height: 6rem;

  position: sticky;
  bottom: 0;

  flex-shrink: 0;

  color: \#fff;
`;

const filterHeaderCss = css`
  position: sticky;
  top: 0;
  background-color: #fff;
  flex-shrink: 0;
  padding: 0 2rem;
`;

export default ServerStationFilters;
