import { css } from 'styled-components';

import type { PropsWithChildren, ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';

import Box from '@common/Box';
import FlexBox from '@common/FlexBox';

import { MOBILE_BREAKPOINT } from '@constants';

import Menus from './Menus';

interface Props {
  trigger: ReactElement;
  menus: PropsWithChildren<{ onClick: () => void }>[];
}

const PopupMenu = ({ trigger, menus }: Props) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [triggerSize, setTriggerSize] = useState({
    width: 0,
    height: 0,
  });
  const [popupSize, setPopupSize] = useState({ popupWidth: 0, popupHeight: 0 });

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (triggerRef.current) {
      const width = triggerRef.current.offsetWidth;
      const height = triggerRef.current.offsetHeight;
      const popupWidth = popupRef.current.offsetWidth;
      const popupHeight = popupRef.current.offsetHeight;

      setTriggerSize({ width, height });
      setPopupSize({ popupWidth, popupHeight });

      console.log(popupHeight, triggerSize);
    }
  }, [isOpen]);

  return (
    <FlexBox css={container}>
      <button ref={triggerRef} onClick={handleToggleMenu}>
        {trigger}
      </button>
      <Box
        ref={popupRef}
        css={getMenuContainerCss(
          triggerSize.width,
          triggerSize.height,
          popupSize.popupWidth,
          popupSize.popupHeight
        )}
      >
        {isOpen && (
          <Menus menus={menus} closeMenu={handleCloseMenu} containerWidth={popupSize.popupWidth} />
        )}
      </Box>
    </FlexBox>
  );
};

const container = css`
  position: relative;
`;

const getMenuContainerCss = (
  triggerWidth: number,
  triggerHeight: number,
  popupWidth: number,
  popupHeight: number
) => {
  return css`
    position: absolute;

    top: -2rem;
    left: calc(${triggerWidth}px + 2rem);

    @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
      top: 0;
      left: 0;
      top: calc(-${popupHeight - triggerHeight}px - 7rem);
      left: calc(-${popupWidth / 2}px + ${triggerWidth / 2}px);
    }
  `;
};

export default PopupMenu;
