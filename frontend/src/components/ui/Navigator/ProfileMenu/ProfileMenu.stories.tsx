import { ArrowRightOnRectangleIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import type { Meta } from '@storybook/react';
import { styled } from 'styled-components';

import Menus from './Menus';
import ProfileMenu from './index';

const meta = {
  title: 'UI/ProfileMenu',
  component: Menus,
  tags: ['autodocs'],
} satisfies Meta<typeof Menus>;

export default meta;

export const Default = () => {
  return (
    <ProfileMenu
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
    <ProfileMenu
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
