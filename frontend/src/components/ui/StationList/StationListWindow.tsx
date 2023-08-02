import { css, styled } from 'styled-components';

import Text from '@common/Text';

import StationList from './StationList';

const StationListWindow = () => {
  return (
    <S.Container>
      <Text tag="h2" fontSize={1.7} weight="bold" css={labelText}>
        주변 충전소
      </Text>
      <StationList />
    </S.Container>
  );
};

const S = {
  Container: styled.section`
    width: 34rem;
    height: 100vh;
    background: #fcfcfc;
    outline: 1.5px solid #e1e4eb;
    padding: 2.8rem 2.2rem 5.2rem;

    & > ul {
      height: calc(100vh - 7.8rem);
    }
  `,
};

const labelText = css`
  padding: 0.8rem 0 2.2rem;
`;

export default StationListWindow;
