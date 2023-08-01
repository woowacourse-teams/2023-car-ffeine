import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { css, styled } from 'styled-components';

import { useExternalState } from '@utils/external-state';

import { stationSearchWindowOpenStore } from '@stores/navItemsOpenStore';

import Button from '@common/Button';
import Text from '@common/Text';

import { windowPositionTriggeredByLnb } from '@style';

import SearchResult from './SearchResult';
import StationSearchBar from './StationSearchBar';

const StationSearchWindow = () => {
  const [isOpen, setIsOpen] = useExternalState(stationSearchWindowOpenStore);

  if (!isOpen) return <></>;

  return (
    <S.Container>
      <section>
        <Button variant="label" onClick={() => setIsOpen(false)} aria-label="검색창 닫기">
          <ChevronLeftIcon width="2.4rem" stroke="#9c9fa7" />
        </Button>
        <StationSearchBar shadow borderColor="#767676" />
        <Text tag="h2" fontSize={1.7} weight="bold" css={labelText}>
          주변 충전소
        </Text>
      </section>

      <SearchResult />
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    width: 34rem;
    height: 100vh;
    background: #fcfcfc;
    outline: 1.5px solid #e1e4eb;
    padding: 2.8rem 2.4rem 5.2rem;

    ${windowPositionTriggeredByLnb}
  `,
};

const labelText = css`
  padding: 4rem 0 2.2rem;
`;

export default StationSearchWindow;
