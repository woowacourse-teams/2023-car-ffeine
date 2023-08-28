import { UserCircleIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import FlexBox from '@common/FlexBox';

import { MOBILE_BREAKPOINT } from '@constants';

import Menus from './Menus';

interface Props {
  menus: PropsWithChildren<{ onClick: () => void }>[];
}

const PopupMenu = ({ menus }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <FlexBox css={container}>
      {isOpen && <Menus menus={menus} closeMenu={handleCloseMenu} />}
      <button onClick={handleToggleMenu}>
        <UserCircleIcon width="2.8rem" stroke="#333" />
      </button>
    </FlexBox>
  );
};

const container = css`
  position: relative;
  display: inline-block;

  & > ul:first-child {
    left: calc(100% + 20px);
    position: absolute;
    top: -18px;

    @media screen and (max-width: ${MOBILE_BREAKPOINT}px) {
      top: -102px;
      left: -43px;
    }
  }
`;

export default PopupMenu;
