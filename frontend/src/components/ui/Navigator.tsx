import { css } from 'styled-components';

import { useSetExternalState } from '@utils/external-state';

import { serverStationFiltersOpenStore } from '@stores/serverStationFiltersOpenStore';

import Button from '@common/Button';
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
  padding-top: 2rem;
`;

const borderCss = css`
  border-right: 0.1rem solid \#dddddd;
`;

const Navigator = () => {
  const setServerStationFiltersOpenStore = useSetExternalState(serverStationFiltersOpenStore);

  const toggleOpenServerStationFilters = () => {
    setServerStationFiltersOpenStore((prev) => !prev);
  };

  return (
    <FlexBox
      width={7}
      height={'100vh'}
      direction="column"
      alignItems="center"
      background={'white'}
      gap={7.5}
      css={`
        ${fixedPositionCss}${paddingCss}${borderCss}
      `}
      noRadius="all"
    >
      <img alt="로고 아이콘" src={LogoIcon} width={30} height={30} style={{ cursor: 'pointer' }} />
      <img
        alt="검색 아이콘"
        src={SearchIcon}
        width={25}
        height={25}
        style={{ cursor: 'pointer' }}
      />
      <Button onClick={toggleOpenServerStationFilters}>
        <img
          alt="필터링 메뉴 열기 아이콘"
          src={FilterIcon}
          width={25}
          height={25}
          style={{ cursor: 'pointer' }}
        />
      </Button>
      <img
        alt="리스트 보기 아이콘"
        src={ListMenuIcon}
        width={25}
        height={25}
        style={{ cursor: 'pointer' }}
      />
    </FlexBox>
  );
};

export default Navigator;
