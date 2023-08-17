import { css, styled } from 'styled-components';

import type { PropsWithChildren } from 'react';

import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';

import { MOBILE_BREAKPOINT } from '@constants';

interface Props {
  menus: PropsWithChildren<{ onClick: () => void }>[];
  closeMenu: () => void;
  containerWidth: number;
}

const Menus = ({ menus, containerWidth, closeMenu }: Props) => {
  return (
    <FlexBox tag="ul" width="max-content" direction="column" alignItems="center" css={containerCss}>
      <StartingPointBox containerWidth={containerWidth} />
      {menus.map(({ children, onClick }, i) => (
        <FlexBox key={i} tag="li">
          <ButtonNext
            variant="text"
            color="dark"
            css={buttonCss}
            onClick={() => {
              onClick();
              closeMenu();
            }}
          >
            {children}
          </ButtonNext>
        </FlexBox>
      ))}
    </FlexBox>
  );
};

const StartingPointBox = styled.div<{ containerWidth: number }>`
  width: 2rem;
  height: 2rem;

  position: absolute;

  border: 1px solid #d6d6d6;

  background-color: #fff;

  transform: rotate(45deg);

  @media screen and (min-width: ${MOBILE_BREAKPOINT}px) {
    top: 2rem;
    left: -1rem;

    border-top: none;
    border-right: none;
  }

  @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    bottom: -1rem;
    left: ${(props) => props.containerWidth / 2 - 10}px;

    border-top: none;
    border-left: none;
  }
`;

const containerCss = css`
  flex-shrink: 0;

  position: relative;

  border: 1px solid #d6d6d6;

  background-color: #fff;
`;

const buttonCss = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;

  padding: 1rem;
`;

export default Menus;
