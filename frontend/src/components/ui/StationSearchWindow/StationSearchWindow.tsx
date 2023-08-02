import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { css, styled } from 'styled-components';

import Button from '@common/Button';
import Text from '@common/Text';

import StationSearchBar from './StationSearchBar';

const StationSearchWindow = () => {
  return (
    <S.Container>
      <Button variant="label" aria-label="검색창 닫기">
        <ChevronLeftIcon width="2.4rem" stroke="#9c9fa7" />
      </Button>
      <StationSearchBar />
      <Text tag="h2" fontSize={1.7} weight="bold" css={labelText}>
        주변 충전소
      </Text>
    </S.Container>
  );
};

const S = {
  Container: styled.section`
    width: 34rem;
    height: 100vh;
    background: #fcfcfc;
    outline: 1.5px solid #e1e4eb;
    padding: 2.8rem 2.4rem 5.2rem;
  `,
};

const labelText = css`
  padding: 3.6rem 0 2.2rem;
`;

export default StationSearchWindow;
