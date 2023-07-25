import { css } from 'styled-components';

import FlexBox from '@common/FlexBox';

import FilterIcon from '@assets/filter-icon.svg';
import ListMenuIcon from '@assets/list-menu-icon.svg';
import LogoIcon from '@assets/logo-icon.svg';
import SearchIcon from '@assets/search-icon.svg';

const fixedPositionCss = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;

const paddingCss = css`
  padding-top: 20px;
`;

const Navigator = () => {
  return (
    <FlexBox
      width={7}
      height={'100vh'}
      direction="column"
      alignItems="center"
      background={'white'}
      gap={7.5}
      css={`
        ${fixedPositionCss}${paddingCss}
      `}
      noRadius="all"
    >
      <img alt="로고 아이콘" src={LogoIcon} width={25} height={25} />
      <img alt="검색 아이콘" src={SearchIcon} width={25} height={25} />
      <img alt="필터링 메뉴 열기 아이콘" src={FilterIcon} width={25} height={25} />
      <img alt="리스트 보기 아이콘" src={ListMenuIcon} width={25} height={25} />
    </FlexBox>
  );
};

export default Navigator;
