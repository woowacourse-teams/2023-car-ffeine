import { css } from 'styled-components';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import Box from '@common/Box';
import FlexBox from '@common/FlexBox';

import Menus from './Menus';

interface Props {
  trigger: ReactNode;
  menus: ReactNode[];
}

const HoverMenu = ({ trigger, menus }: Props) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState(0);

  useEffect(() => {
    setTriggerWidth(triggerRef.current.offsetWidth);
  }, []);

  return (
    <FlexBox
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      css={container}
    >
      <div ref={triggerRef}>{trigger}</div>
      <Box css={getMenuContainerCss(triggerWidth)}>{isHovered && <Menus menus={menus} />}</Box>
    </FlexBox>
  );
};

const container = css`
  position: relative;
`;

const getMenuContainerCss = (triggerWidth: number) => {
  return css`
    position: absolute;

    top: -2rem;
    left: calc(${triggerWidth}px + 2rem);
  `;
};

export default HoverMenu;
