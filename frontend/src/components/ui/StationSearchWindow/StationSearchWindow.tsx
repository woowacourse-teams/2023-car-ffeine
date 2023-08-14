import { css, styled } from 'styled-components';

import Text from '@common/Text';

import StationList from '@ui/StationList/StationList';

import StationSearchBar from './StationSearchBar';

const StationSearchWindow = () => {
  return (
    <S.Container>
      <S.Padding>
        <StationSearchBar />
        <Text tabIndex={0} tag="h2" fontSize={1.7} weight="bold" css={labelText}>
          주변 충전소
        </Text>
      </S.Padding>

      <StationList />
    </S.Container>
  );
};

const S = {
  Container: styled.article`
    width: 34rem;
    height: 100vh;
    background: #fcfcfc;
    outline: 1.5px solid #e1e4eb;
    padding-top: 3.6rem;
  `,

  Padding: styled.div`
    padding: 0 2rem;
  `,
};

const labelText = css`
  padding: 5.2rem 0 2.2rem;
`;

export default StationSearchWindow;
