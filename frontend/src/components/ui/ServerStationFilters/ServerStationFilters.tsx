import { css } from 'styled-components';

import { useQueryClient } from '@tanstack/react-query';

import { toastActions } from '@stores/layout/toastStore';

import { useServerStationFilters } from '@hooks/tanstack-query/station-filters/useServerStationFilters';
import { useServerStationFilterActions } from '@hooks/useServerStationFilterActions';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import type { COMPANY_NAME } from '@constants/chargers';

import type { Capacity } from '@type';

import FilterSection from './FilterOption';

const ServerStationFilters = () => {
  const queryClient = useQueryClient();
  const { showToast } = toastActions;
  const { data: serverStationFilters, isLoading } = useServerStationFilters();

  const {
    toggleSelectCapacityFilter,
    toggleSelectChargerTypesFilter,
    toggleSelectCompanyNamesFilter,
    getIsCapacitySelected,
    getIsChargerTypeSelected,
    getIsCompanyNameSelected,
  } = useServerStationFilterActions();

  const handleApplySelectedFilters = () => {
    queryClient.invalidateQueries({ queryKey: ['stations'] });
    showToast('필터가 적용되었습니다');
  };

  if (isLoading) {
    return <></>;
  }

  const { connectorTypes, capacities, companyNames } = serverStationFilters;

  return (
    <FlexBox
      width={34}
      height={'100vh'}
      alignItems={'center'}
      direction={'column'}
      background={'white'}
      css={`
        ${overFlowCss}${borderCss}${paddingCss}
      `}
      nowrap={true}
      noRadius={'all'}
      gap={6}
    >
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

export default ServerStationFilters;
