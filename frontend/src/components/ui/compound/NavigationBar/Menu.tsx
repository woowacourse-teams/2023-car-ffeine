import {
  AdjustmentsHorizontalIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import { useExternalValue } from '@utils/external-state';

import { modalActions } from '@stores/layout/modalStore';
import { userTokenStore } from '@stores/userTokenStore';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';

import LoginModal from '@ui/LoginModal/LoginModal';
import MswControlButton from '@ui/MswControlButton';
import ServerStationFilters from '@ui/ServerStationFilters';
import StationListWindow from '@ui/StationList/StationListWindow';
import StationSearchWindow from '@ui/StationSearchWindow';
import LogoIcon from '@ui/Svg/LogoIcon';

import PopupMenu from '../PopupMenu';
import { useNavigationBar } from './hooks/useNavigationBar';
import { loginMenus } from './loginMenus';

const Menu = () => {
  const { openBasePanel } = useNavigationBar();
  const userToken = useExternalValue(userTokenStore);

  const handleClickLoginIcon = () => {
    modalActions.openModal(<LoginModal />);
  };

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
