import { UserCircleIcon } from '@heroicons/react/24/outline';
import { css } from 'styled-components';

import type { PropsWithChildren } from 'react';

import { useExternalState } from '@utils/external-state';

import { popupMenuOpenStore } from '@stores/popupMenuOpenStore';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import { MOBILE_BREAKPOINT } from '@constants';

import Menus from './Menus';

interface Props {
  menus: PropsWithChildren<{ onClick: () => void }>[];
}

const PopupMenu = ({ menus }: Props) => {
  const [isOpen, setIsOpen] = useExternalState(popupMenuOpenStore);

  const closePopupMenu = () => {
    setIsOpen(false);
  };

  const toggleOpenPopupMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <FlexBox css={container} onClick={(event) => event.stopPropagation()}>
      {isOpen && <Menus menus={menus} closeMenu={closePopupMenu} />}
      <Button onClick={toggleOpenPopupMenu} aria-label="내 정보 메뉴 열기">
        <UserCircleIcon width="2.8rem" stroke="#555" />
        <Text mt={0.5} variant="caption">
          내정보
        </Text>
      </Button>
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
