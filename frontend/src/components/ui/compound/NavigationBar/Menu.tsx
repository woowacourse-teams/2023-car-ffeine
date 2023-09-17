import { AdjustmentsHorizontalIcon, Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import { HiArrowPath, HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';

import { useExternalValue } from '@utils/external-state';

import { modalActions } from '@stores/layout/modalStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';

import ServerStationFilters from '@ui/ServerStationFilters';
import StationListWindow from '@ui/StationList/StationListWindow';
import StationSearchWindow from '@ui/StationSearchWindow';
import LogoIcon from '@ui/Svg/LogoIcon';
import PersonalMenu from '@ui/compound/NavigationBar/PersonalMenu';
import LoginModal from '@ui/modal/LoginModal/LoginModal';

import { displayNoneInMobile, displayNoneInWeb } from '@style/mediaQuery';

import { EMPTY_MEMBER_TOKEN, MOBILE_BREAKPOINT } from '@constants';

import { useNavigationBar } from './hooks/useNavigationBar';

const Menu = () => {
  const { openBasePanel } = useNavigationBar();

  const memberToken = useExternalValue(memberTokenStore);

  const handleClickLoginIcon = () => {
    modalActions.openModal(<LoginModal />);
  };

  return (
    <FlexBox css={[fixedPositionCss, paddingCss, borderCss, flexCss]} noRadius="all" nowrap>
      <Button css={displayNoneInMobile} aria-label="새로 고침" onClick={() => location.reload()}>
        <LogoIcon width={3} />
      </Button>

      <Button css={displayNoneInWeb} aria-label="새로 고침" onClick={() => location.reload()}>
        <HiArrowPath size="2.8rem" stroke="#333" />
      </Button>

      <Button
        css={displayNoneInMobile}
        aria-label="주변 충전소 목록 열기"
        onClick={() => openBasePanel(<StationSearchWindow />)}
      >
        <Bars3Icon width="2.8rem" stroke="#333" />
      </Button>
      <Button aria-label="필터링 메뉴 열기" onClick={() => openBasePanel(<ServerStationFilters />)}>
        <AdjustmentsHorizontalIcon width="2.8rem" stroke="#333" />
      </Button>
      {memberToken !== EMPTY_MEMBER_TOKEN ? (
        <PersonalMenu />
      ) : (
        <Button aria-label="로그인 하기" onClick={handleClickLoginIcon}>
          <UserCircleIcon width="2.8rem" stroke="#333" />
        </Button>
      )}
      <Button
        css={displayNoneInWeb}
        aria-label="충전소 리스트 열기"
        onClick={() => openBasePanel(<StationListWindow />)}
      >
        <Bars3Icon width="2.8rem" stroke="#333" />
      </Button>
      <Button
        aria-label="설문조사 하기"
        onClick={() => {
          if (confirm('설문조사에 참여하시겠습니까?')) {
            window.open('https://forms.gle/YQKx1zchUifjUJ396');
          }
        }}
      >
        <HiOutlineChatBubbleOvalLeftEllipsis size="2.8rem" stroke="#333" color="#333" />
      </Button>
    </FlexBox>
  );
};

const flexCss = css`
  width: 7rem;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  gap: 3rem;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 100vw;
    height: 6rem;
    flex-direction: row;
    gap: 0;
    justify-content: space-around;

    & > svg:first-child {
      display: none;
    }
  }
`;

const fixedPositionCss = css`
  position: fixed;
  left: 0;
  z-index: 999;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    bottom: 0;
    z-index: 99;
  }
`;

const paddingCss = css`
  padding-top: 2rem;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    padding-top: 0;
  }
`;

const borderCss = css`
  border-right: 0.1rem solid #ddd;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    border-top: 0.1rem solid #ddd;
    border-right: none;
  }
`;

export default Menu;
