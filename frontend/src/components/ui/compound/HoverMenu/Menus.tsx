import { css, styled } from 'styled-components';

import type { ReactNode } from 'react';

import ButtonNext from '@common/ButtonNext';
import FlexBox from '@common/FlexBox';

interface Props {
  menus: ReactNode[];
}

const Menus = ({ menus }: Props) => {
  return (
    <FlexBox tag="ul" width="fit-content" direction="column" alignItems="center" css={containerCss}>
      <StartingPointBox />
      {menus.map((menu, i) => (
        <FlexBox key={i} tag="li">
          <ButtonNext variant="text" color="dark" css={buttonCss}>
            {menu}
          </ButtonNext>
        </FlexBox>
      ))}
    </FlexBox>
  );
};

const StartingPointBox = styled.div`
  width: 2rem;
  height: 2rem;

  position: absolute;
  top: 2rem;
  left: -1rem;

  border: 1px solid #d6d6d6;
  border-top: none;
  border-right: none;

  background-color: #fff;

  transform: rotate(45deg);
`;

const containerCss = css`
  position: relative;

  border: 1px solid #d6d6d6;

  background-color: #fff;
`;

const buttonCss = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  padding: 1rem;
`;

export default Menus;
