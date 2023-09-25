import styled from 'styled-components';

export const StyledMessage = styled.h2`
  width: fit-content;
  margin: 20% auto 0;
  text-align: center;
  font-size: 24px;
  font-weight: 500;

  & > span {
    display: block;
    margin-top: 20px;
    font-size: 15px;
    font-weight: normal;
  }
`;
export const StyledLoadingSvgContainer = styled.div`
  max-width: 100px;
  margin: 0 auto;
`;
