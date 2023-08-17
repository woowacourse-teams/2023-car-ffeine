import {
  AdjustmentsHorizontalIcon,
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
import { memberTokenStore } from '@stores/login/memberTokenStore';
import {
  selectedCapacitiesFilterStore,
  selectedConnectorTypesFilterStore,
  selectedCompaniesFilterStore,
} from '@stores/station-filters/serverStationFiltersStore';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';

import MswControlButton from '@ui/MswControlButton';
import ServerStationFilters from '@ui/ServerStationFilters';
import StationSearchWindow from '@ui/StationSearchWindow';
import LogoIcon from '@ui/Svg/LogoIcon';
import CarModal from '@ui/modal/CarModal/CarModal';
import LoginModal from '@ui/modal/LoginModal/LoginModal';

import { QUERY_KEY_STATIONS } from '@constants/queryKeys';

import PopupMenu from '../PopupMenu';
import { useNavigationBar } from './hooks/useNavigationBar';

const Menu = () => {
  const { openBasePanel } = useNavigationBar();

  const memberToken = useExternalValue(memberTokenStore);
  const queryClient = useQueryClient();

  const { openModal } = modalActions;

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
      onClick: () => {
        openModal(<CarModal />);
      },
    },
    {
      children: (
        <>
          <ArrowRightOnRectangleIcon width="1.8rem" color="#333" /> 로그아웃
        </>
      ),
      onClick: () => {
        logout();

        selectedCapacitiesFilterStore.setState(new Set([]));
        selectedConnectorTypesFilterStore.setState(new Set([]));
        selectedCompaniesFilterStore.setState(new Set([]));

        queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATIONS] });
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
      <LogoIcon width={3} />
      <Button aria-label="검색창 열기" onClick={() => openBasePanel(<StationSearchWindow />)}>
        <MagnifyingGlassIcon width="2.8rem" stroke="#333" />
      </Button>
      <Button aria-label="필터링 메뉴 열기" onClick={() => openBasePanel(<ServerStationFilters />)}>
        <AdjustmentsHorizontalIcon width="2.8rem" stroke="#333" />
      </Button>
      {memberToken !== '' ? (
        <PopupMenu menus={loginMenus} />
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
