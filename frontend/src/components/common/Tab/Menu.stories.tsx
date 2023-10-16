import type { Meta } from '@storybook/react';

import { HiHeart, HiOutlineHeart } from 'react-icons/hi2';

import type { MenuProps } from './Menu';
import Tab from './Tab';

const meta = {
  title: 'Tab/Menu',
  tags: ['autodocs'],
  component: Tab.Menu,
  args: {
    label: '탭',
    iconPosition: 'left',
    index: 0,
  },
  argTypes: {
    css: {
      description: 'CSS 속성을 직접 입력할 수 있습니다.',
    },
  },
} satisfies Meta<typeof Tab.Menu>;

export default meta;

export const Default = ({ label }: MenuProps) => {
  return (
    <Tab id="menu-default">
      <Tab.Menus gap={3}>
        {Array.from({ length: 7 }, (_, index) => (
          <Tab.Menu key={index} label={label} index={index} />
        ))}
      </Tab.Menus>
    </Tab>
  );
};

export const TabWithIcons = ({ label, iconPosition }: MenuProps) => {
  return (
    <Tab id="menu-with-icons" width={30}>
      <Tab.Menus highlightColor="#32affd">
        <Tab.Menu label={label} index={0} icon={<HiOutlineHeart />} iconPosition={iconPosition} />
        <Tab.Menu label={label} index={1} icon={<HiOutlineHeart />} />
        <Tab.Menu label={label} index={2} icon={<HiHeart />} iconPosition="top" />
        <Tab.Menu label={label} index={3} icon={<HiOutlineHeart />} iconPosition="right" />
        <Tab.Menu label={label} index={4} icon={<HiHeart />} iconPosition="bottom" />
      </Tab.Menus>
    </Tab>
  );
};
