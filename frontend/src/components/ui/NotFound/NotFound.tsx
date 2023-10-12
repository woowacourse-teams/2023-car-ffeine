import styled from 'styled-components';

import { ImHome } from 'react-icons/im';
import { Link } from 'react-router-dom';

import FlexBox from '@common/FlexBox';

import { MOBILE_BREAKPOINT } from '@constants';

import ErrorImage from '@assets/not-found.svg';

const NotFound = () => {
  return (
    <FlexBox
      id="page-404"
      nowrap
      direction="column"
      layout="center"
      width="100%"
      height="100vh"
      bgColor="#7e76e5"
      gap={0}
      noRadius="all"
    >
      <Image alt="404 이미지" />
      <GoHome to="/">
        <ImHome />
        홈으로 돌아가기
      </GoHome>
    </FlexBox>
  );
};

const Image = styled(ErrorImage)`
  transform: scale(0.6);
  margin: -24rem 0 -9.6rem;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    margin: auto 0;
    transform: scale(0.42);
  }
`;

const GoHome = styled(Link)`
  max-width: 28.4rem;
  width: calc(100% - 4.8rem);
  padding: 1.8rem 0 2rem;
  border-radius: 8px;
  background: #fff;
  color: #333;
  text-align: center;
  font-weight: 500;
  font-size: 16px;

  & > svg {
    margin-right: 0.8rem;
    vertical-align: bottom;
  }

  &:hover {
    background: #333;
    color: #fff;
    fill: #fff;
  }

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    margin: auto 0 12rem;
  }
`;

export default NotFound;
