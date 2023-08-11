import { ArrowRightOnRectangleIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import type { Meta } from '@storybook/react';
import { styled } from 'styled-components';

import PopupMenu from '.';
import Menus from './Menus';

const meta = {
  title: 'UI/HoverMenus',
  component: Menus,
  tags: ['autodocs'],
} satisfies Meta<typeof Menus>;

export default meta;

export const Default = () => {
  return (
    <PopupMenu
      trigger={<UserCircleIcon width="2.8rem" stroke="#333" />}
      menus={[
        {
          children: (
            <>
              <PencilSquareIcon width="1.8rem" color="#333" /> 차량등록
            </>
          ),
          onClick: () => alert('차량등록'),
        },
        {
          children: (
            <>
              <ArrowRightOnRectangleIcon width="1.8rem" color="#333" /> 로그아웃
            </>
          ),
          onClick: () => alert('로그아웃'),
        },
      ]}
    />
  );
};

export const BigTrigger = () => {
  return (
    <PopupMenu
      trigger={<Trigger />}
      menus={[
        {
          children: (
            <>
              <PencilSquareIcon width="1.8rem" color="#333" /> 차량등록
            </>
          ),
          onClick: () => alert('차량등록'),
        },
        {
          children: (
            <>
              <ArrowRightOnRectangleIcon width="1.8rem" color="#333" /> 로그아웃
            </>
          ),
          onClick: () => alert('로그아웃'),
        },
      ]}
    />
  );
};

const Trigger = styled.div`
  width: 30rem;
  height: 15rem;

  background-color: blue;
`;
