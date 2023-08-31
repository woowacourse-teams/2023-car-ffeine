import { css } from 'styled-components';

import type { PropsWithChildren } from 'react';

import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';

import { MOBILE_BREAKPOINT } from '@constants';

interface Props {
  menus: PropsWithChildren<{ onClick: () => void }>[];
  closeMenu: () => void;
}

const Menus = ({ menus, closeMenu }: Props) => {
  return (
    <FlexBox
      tag="ul"
      width="max-content"
      direction="column"
      alignItems="center"
      gap={0}
      css={containerCss}
    >
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

const containerCss = css`
  position: relative;

  border: 2.4px solid #333;

  background: #fff;

  &::before {
    content: '';
    width: 2rem;
    height: 2rem;
    background: none;

    position: absolute;
    top: 2rem;
    left: -1rem;

    border: 1px solid #333;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent transparent #333;

    transform: rotate(45deg);

    @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
      top: auto;
      bottom: -10px;
      left: auto;
      transform: rotate(-45deg);
    }
  }
`;

const buttonCss = css`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  padding: 0.8rem 1rem;
  font-size: 1.5rem;
`;

export default Menus;
