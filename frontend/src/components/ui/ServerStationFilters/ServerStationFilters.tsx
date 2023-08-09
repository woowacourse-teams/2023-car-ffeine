import { css } from 'styled-components';

import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { getTypedObjectKeys } from '@utils/getTypedObjectKeys';
import { getSessionStorage } from '@utils/storage';

import { toastActions } from '@stores/layout/toastStore';

import { useServerStationFilters } from '@hooks/useServerStationFilters';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import { SERVERS } from '@constants';
import { CAPACITIES, CHARGER_TYPES, COMPANY_NAME } from '@constants/chargers';
import { SESSION_KEY_USER_TOKEN } from '@constants/storageKeys';

import FilterSection from './FilterOption';

const ServerStationFilters = () => {
  const queryClient = useQueryClient();
  const { showToast } = toastActions;

  const {
    toggleSelectCapacityFilter,
    toggleSelectChargerTypesFilter,
    toggleSelectCompanyNamesFilter,
    getIsCapacitySelected,
    getIsChargerTypeSelected,
    getIsCompanyNameSelected,
  } = useServerStationFilters();

  const handleApplySelectedFilters = () => {
    queryClient.invalidateQueries({ queryKey: ['stations'] });
    showToast('필터가 적용되었습니다');
  };

  // TODO: 이 부분 훅 분리 하거나 함수 분리 하기
  useEffect(() => {
    fetch(`${SERVERS.localhost}/filters`)
      .then((response) => response.json())
      .then((data) => console.log(data));

    fetch(`${SERVERS.localhost}/members`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getSessionStorage(SESSION_KEY_USER_TOKEN, '')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    fetch(`${SERVERS.localhost}/members/filters`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getSessionStorage(SESSION_KEY_USER_TOKEN, '')}`,
      },
      body: JSON.stringify({
        connectorTypes: [
          {
            key: 'DC_COMBO',
            value: '고속차지',
          },
          {
            key: 'DC_COMBO2',
            value: '고속차지',
          },
        ],
        capacities: [
          {
            capacity: 3.0,
          },
          {
            capacity: 7.0,
          },
          {
            capacity: 10.0,
          },
        ],
        companyNames: [
          {
            key: 'HG',
            value: '환경부',
          },
          {
            key: 'HG2',
            value: '환경부',
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    fetch(`${SERVERS.localhost}/members/filters`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getSessionStorage(SESSION_KEY_USER_TOKEN, '')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

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
        filterOptionNames={Object.values(CHARGER_TYPES)}
        filterOptionValues={getTypedObjectKeys(CHARGER_TYPES)}
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
