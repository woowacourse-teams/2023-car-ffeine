import styled from 'styled-components';

import { pillStyle } from '@style';

import { MOBILE_BREAKPOINT } from '@constants';

export const StyledContainer = styled.div`
  width: 30rem;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 100%;
  }
`;

export const StyledForm = styled.form`
  position: relative;
  min-width: 30rem;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    min-width: 100%;
  }
`;

export const StyledSearch = styled.input`
  ${pillStyle};

  background: #fcfcfc;
  border: 1px solid #d0d2d8;

  width: 100%;
  padding: 1.9rem 4.6rem 2rem 1.8rem;
  font-size: 1.3rem;

  & + button {
    position: absolute;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
  }

  &:focus {
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.2);
    outline: 0;
  }
`;
