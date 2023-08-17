import { styled } from 'styled-components';

import LoadingSvg from '@assets/loading.svg';

function Loading() {
  return (
    <>
      <Message>
        열심히 로딩하고 있어요<span>잠시만 기다려 주세요...</span>
      </Message>
      <LoadingSvgContainer>
        <img src={LoadingSvg} alt="로딩중" />
      </LoadingSvgContainer>
    </>
  );
}

const Message = styled.h2`
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

const LoadingSvgContainer = styled.div`
  max-width: 100px;
  margin: 0 auto;
`;

export default Loading;
