import { css } from 'styled-components';

import type { PropsWithChildren, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import Box from '@common/Box';
import FlexBox from '@common/FlexBox';

import Menus from './Menus';

interface Props {
  trigger: ReactNode;
  menus: PropsWithChildren<{ onClick: () => void }>[];
}

const PopupMenu = ({ trigger, menus }: Props) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState(0);

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (triggerRef.current) setTriggerWidth(triggerRef.current.offsetWidth);
  }, []);

  return (
    <FlexBox css={container}>
      <button ref={triggerRef} onClick={handleToggleMenu}>
        {trigger}
      </button>
      <Box css={getMenuContainerCss(triggerWidth)}>
        {isOpen && <Menus menus={menus} closeMenu={handleCloseMenu} />}
      </Box>
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

export default PopupMenu;
