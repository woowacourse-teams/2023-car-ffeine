import { css, styled } from 'styled-components';

import Text from '@common/Text';

import StationList from '@ui/StationListWindow/StationList';

import { MOBILE_BREAKPOINT, NAVIGATOR_PANEL_WIDTH } from '@constants';

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
    width: ${NAVIGATOR_PANEL_WIDTH}rem;
    height: 100vh;
    background: #fcfcfc;
    outline: 1.5px solid #e1e4eb;
    padding-top: 2.4rem;

    @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
      display: none;
    }
  `,

  Padding: styled.div`
    padding: 0 2rem;
  `,
};

const labelText = css`
  padding: 4.2rem 0 2.2rem;
`;

export default StationSearchWindow;
