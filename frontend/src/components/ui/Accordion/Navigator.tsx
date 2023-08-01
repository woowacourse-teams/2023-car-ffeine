import {
  AdjustmentsHorizontalIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import { css } from 'styled-components';

import { useContext } from 'react';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';

import MswControlButton from '@ui/MswControlButton';
import LogoIcon from '@ui/Svg/LogoIcon';

import { AccordionContext } from '.';
import { useAccordionAction } from './hooks/useAccordionAction';

const Navigator = () => {
  const { basePanelType } = useContext(AccordionContext);
  const { toggleOpenBasePanel: handleOpenBasePanel } = useAccordionAction();

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
        <LogoIcon width={3} />
      </Button>
      <Button aria-label="검색창 열기" onClick={() => handleOpenBasePanel('searchWindow')}>
        <MagnifyingGlassIcon width="2.8rem" stroke="#333" />
      </Button>
      <Button
        aria-label="필터링 메뉴 열기"
        onClick={() => handleOpenBasePanel('serverStationFilters')}
      >
        <AdjustmentsHorizontalIcon width="2.8rem" stroke="#333" />
      </Button>
      <Button aria-label="충전소 목록 보기" onClick={() => handleOpenBasePanel('stationList')}>
        <Bars3Icon width="2.8rem" stroke="#333" />
      </Button>
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

export default Navigator;
