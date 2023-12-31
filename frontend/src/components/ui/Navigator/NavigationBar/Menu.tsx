import { AdjustmentsHorizontalIcon, Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import { HiOutlineArrowDownTray, HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';

import { useExternalValue } from '@utils/external-state';

import { modalActions } from '@stores/layout/modalStore';
import { memberTokenStore } from '@stores/login/memberTokenStore';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import PersonalMenu from '@ui/Navigator/NavigationBar/PersonalMenu';
import ServerStationFilters from '@ui/ServerStationFilters';
import StationListWindow from '@ui/StationListWindow';
import StationSearchWindow from '@ui/StationSearchWindow';
import HowToAppInstallModal from '@ui/modal/HowToAppInstallModal';
import LoginModal from '@ui/modal/LoginModal/LoginModal';

import { displayNoneInMobile, displayNoneInWeb } from '@style/mediaQuery';

import { EMPTY_MEMBER_TOKEN, MOBILE_BREAKPOINT } from '@constants';

import Logo from '@assets/logo-sm.svg';

import { useNavigationBar } from './hooks/useNavigationBar';

// TODO: 모바일 오류 (미디어 쿼리) 개선

const Menu = () => {
  const { toggleBasePanel } = useNavigationBar();

  const memberToken = useExternalValue(memberTokenStore);
  const isSignIn = memberToken !== EMPTY_MEMBER_TOKEN;

  const handleClickLoginIcon = () => {
    modalActions.openModal(<LoginModal />);
  };

  const handleOpenHowToAppInstallModal = () => {
    modalActions.openModal(<HowToAppInstallModal />);
  };

  return (
    <FlexBox css={[fixedPositionCss, paddingCss, borderCss, flexCss]} noRadius="all" nowrap>
      <Button
        height={2.8}
        noRadius="all"
        css={displayNoneInMobile}
        aria-label="새로 고침"
        onClick={() => location.reload()}
      >
        <Logo />
      </Button>

      <Button
        noRadius="all"
        aria-label="카페인 앱 설치하기"
        css={displayNoneInWeb}
        onClick={handleOpenHowToAppInstallModal}
      >
        <HiOutlineArrowDownTray size="2.8rem" stroke="#555" />
        <Text mt={0.5} variant="caption">
          앱설치
        </Text>
      </Button>

      <Button
        noRadius="all"
        css={displayNoneInMobile}
        aria-label="주변 충전소 목록 열기"
        onClick={() => toggleBasePanel(<StationSearchWindow key="base-panel-list" />)}
      >
        <Bars3Icon width="2.8rem" stroke="#555" />
        <Text mt={0.5} variant="caption">
          목록
        </Text>
      </Button>

      <Button
        noRadius="all"
        aria-label="필터링 메뉴 열기"
        onClick={() => toggleBasePanel(<ServerStationFilters key="base-panel-filter" />)}
      >
        <AdjustmentsHorizontalIcon width="2.8rem" stroke="#555" />
        <Text mt={0.5} variant="caption">
          필터
        </Text>
      </Button>

      {isSignIn ? (
        <PersonalMenu />
      ) : (
        <Button noRadius="all" aria-label="로그인 하기" onClick={handleClickLoginIcon}>
          <UserCircleIcon width="2.8rem" stroke="#555" />
          <Text mt={0.5} variant="caption">
            내정보
          </Text>
        </Button>
      )}

      <Button
        noRadius="all"
        css={displayNoneInWeb}
        aria-label="충전소 리스트 열기"
        onClick={() => toggleBasePanel(<StationListWindow key="base-panel-list" />)}
      >
        <Bars3Icon width="2.8rem" stroke="#555" />
        <Text mt={0.5} variant="caption">
          목록
        </Text>
      </Button>

      <Button
        noRadius="all"
        aria-label="설문조사 하기"
        onClick={() => {
          if (confirm('설문조사에 참여하시겠습니까?')) {
            window.open('https://forms.gle/YQKx1zchUifjUJ396');
          }
        }}
      >
        <HiOutlineChatBubbleOvalLeftEllipsis size="2.8rem" stroke="#555" />
        <Text mt={0.5} variant="caption">
          피드백
        </Text>
      </Button>

      <Button
        noRadius="all"
        aria-label="카페인 앱 설치하기"
        onClick={handleOpenHowToAppInstallModal}
        css={displayNoneInMobile}
      >
        <HiOutlineArrowDownTray size="2.8rem" stroke="#555" />
        <Text mt={0.5} variant="caption">
          앱설치
        </Text>
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
    height: 8.4rem;
    padding: 0.2rem 0 0.8rem;
    flex-direction: row;
    align-items: center;
    gap: 0;
    justify-content: space-around;
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
  padding-top: 2.4rem;

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
