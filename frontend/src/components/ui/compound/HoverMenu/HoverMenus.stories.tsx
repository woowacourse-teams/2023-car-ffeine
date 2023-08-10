import { ArrowRightOnRectangleIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import type { Meta } from '@storybook/react';
import { styled } from 'styled-components';

import HoverMenu from '.';
import Menus from './Menus';

const meta = {
  title: 'UI/HoverMenus',
  component: Menus,
  tags: ['autodocs'],
} satisfies Meta<typeof Menus>;

export default meta;

export const Default = () => {
  return (
    <HoverMenu
      trigger={<UserCircleIcon width="2.8rem" stroke="#333" />}
      menus={[
        <>
          <PencilSquareIcon width="1.8rem" color="#333" /> 차량등록
        </>,
        <>
          <ArrowRightOnRectangleIcon width="1.8rem" color="#333" /> 로그아웃
        </>,
      ]}
    />
  );
};

export const BigTrigger = () => {
  return (
    <HoverMenu
      trigger={<Trigger />}
      menus={[
        <>
          <PencilSquareIcon width="1.8rem" color="#333" /> 차량등록
        </>,
        <>
          <ArrowRightOnRectangleIcon width="1.8rem" color="#333" /> 로그아웃
        </>,
      ]}
    />
  );
};

const Trigger = styled.div`
  width: 30rem;
  height: 15rem;

  background-color: blue;
`;
