import {
  AdjustmentsHorizontalIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightOnRectangleIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { css } from 'styled-components';

import type { PropsWithChildren } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useExternalValue } from '@utils/external-state';
import { logout } from '@utils/login';

import { modalActions } from '@stores/layout/modalStore';
import {
  selectedCapacitiesFilterStore,
  selectedChargerTypesFilterStore,
  selectedCompanyNamesFilterStore,
} from '@stores/station-filters/serverStationFiltersStore';
import { userTokenStore } from '@stores/userTokenStore';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';

import LoginModal from '@ui/LoginModal/LoginModal';
import MswControlButton from '@ui/MswControlButton';
import ServerStationFilters from '@ui/ServerStationFilters';
import StationListWindow from '@ui/StationList/StationListWindow';
import StationSearchWindow from '@ui/StationSearchWindow';
import LogoIcon from '@ui/Svg/LogoIcon';

import { QUERY_KEY_STATIONS } from '@constants/queryKeys';

import PopupMenu from '../PopupMenu';
import { useNavigationBar } from './hooks/useNavigationBar';

const Menu = () => {
  const { openBasePanel } = useNavigationBar();
  const userToken = useExternalValue(userTokenStore);
  const queryClient = useQueryClient();

  const handleClickLoginIcon = () => {
    modalActions.openModal(<LoginModal />);
  };

  const loginMenus: PropsWithChildren<{ onClick: () => void }>[] = [
    {
      children: (
        <>
          <PencilSquareIcon width="1.8rem" color="#333" /> 차량등록
        </>
      ),
      onClick: () => alert('차량등록'),
    },
    {
      children: (
        <>
          <ArrowRightOnRectangleIcon width="1.8rem" color="#333" /> 로그아웃
        </>
      ),
      onClick: () => {
        selectedCapacitiesFilterStore.setState([]);
        selectedChargerTypesFilterStore.setState([]);
        selectedCompanyNamesFilterStore.setState([]);

        queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATIONS] });

        logout();
      },
    },
  ];

  return (
    <FlexBox
      width={7}
      height="100vh"
      direction="column"
      alignItems="center"
      background="#fff"
      gap={7.5}
      css={[fixedPositionCss, paddingCss, borderCss]}
      noRadius="all"
      nowrap
    >
      <Button>
        <LogoIcon width={3} />
      </Button>
      <Button aria-label="검색창 열기" onClick={() => openBasePanel(<StationSearchWindow />)}>
        <MagnifyingGlassIcon width="2.8rem" stroke="#333" />
      </Button>
      <Button aria-label="필터링 메뉴 열기" onClick={() => openBasePanel(<ServerStationFilters />)}>
        <AdjustmentsHorizontalIcon width="2.8rem" stroke="#333" />
      </Button>
      <Button aria-label="충전소 목록 보기" onClick={() => openBasePanel(<StationListWindow />)}>
        <Bars3Icon width="2.8rem" stroke="#333" />
      </Button>
      {userToken !== '' ? (
        <PopupMenu trigger={<UserCircleIcon width="2.8rem" stroke="#333" />} menus={loginMenus} />
      ) : (
        <Button aria-label="로그인 하기" onClick={handleClickLoginIcon}>
          <UserCircleIcon width="2.8rem" stroke="#333" />
        </Button>
      )}

      {process.env.NODE_ENV === 'development' && <MswControlButton />}
    </FlexBox>
  );
};

const fixedPositionCss = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;

const paddingCss = css`
  padding-top: 2rem;
`;

const borderCss = css`
  border-right: 0.1rem solid #ddd;
`;

export default Menu;
