import { StyledLoadingSvgContainer, StyledMessage } from '@ui/Loading/Loading.style';

import LoadingSvg from '@assets/loading.svg';

const Loading = () => {
  return (
    <>
      <StyledMessage>
        열심히 로딩하고 있어요<span>잠시만 기다려 주세요...</span>
      </StyledMessage>
      <StyledLoadingSvgContainer>
        <LoadingSvg />
      </StyledLoadingSvgContainer>
    </>
  );
};

export default Loading;
