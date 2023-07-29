import {
  AdjustmentsHorizontalIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import { useSetExternalState } from '@utils/external-state';

import {
  serverStationFiltersOpenStore,
  stationSearchWindowOpenStore,
} from '@stores/navItemsOpenStore';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';

import MswControlButton from '@ui/MswControlButton';

import LogoIcon from '@assets/logo-icon.svg';

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

const Navigator = () => {
  const setStationSearchWindowOpenState = useSetExternalState(stationSearchWindowOpenStore);
  const setServerStationFiltersOpenState = useSetExternalState(serverStationFiltersOpenStore);

  const toggleStationSearchWindow = () => {
    setStationSearchWindowOpenState((prev) => {
      if (!prev) {
        setServerStationFiltersOpenState(false);
      }
      return !prev;
    });
  };

  const toggleServerStationFilters = () => {
    setServerStationFiltersOpenState((prev) => {
      if (!prev) {
        setStationSearchWindowOpenState(false);
      }
      return !prev;
    });
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
      nowrap={true}
    >
      <Button>
        <img alt="커피컵과 자동차가 그려진 파란색 로고" src={LogoIcon} width={36} height={36} />
      </Button>
      <Button onClick={toggleStationSearchWindow} aria-label="검색창 열기">
        <MagnifyingGlassIcon width="2.8rem" stroke="#333" />
      </Button>
      <Button onClick={toggleServerStationFilters} aria-label="필터링 메뉴 열기">
        <AdjustmentsHorizontalIcon width="2.8rem" stroke="#333" />
      </Button>
      <Button aria-label="충전소 목록 보기">
        <Bars3Icon width="2.8rem" stroke="#333" />
      </Button>
      {process.env.NODE_ENV === 'development' && <MswControlButton />}
    </FlexBox>
  );
};

export default Navigator;