import type { Meta } from '@storybook/react';

import Text from '@common/Text';
import { sizeArgTypes } from '@common/styles/common';
import { spacingArgTypes } from '@common/styles/spacing';

import type { MenusProps } from './Menus';
import Tab from './Tab';

const meta = {
  title: 'Tab/Menus',
  tags: ['autodocs'],
  component: Tab.Menus,
  parameters: {
    docs: {
      description: {
        component: `Tab의 Menus는 FlexContainer로 구성되었습니다. layout 속성을 제외한 FlexContainer의 속성을 그대로 사용할 수 있습니다.`,
      },
    },
  },
  args: {
    highlightColor: '#32affd',
    index: 1,
    lineClamp: false,
  },
  argTypes: {
    layout: {
      table: {
        disable: true,
      },
    },
    index: {
      control: {
        type: 'number',
      },
      description:
        '같은 index 가진 Content와 연결<br />Menu를 누르면 Menu의 index와 같은 index를 가진 Content가 보임',
    },
    css: {
      description: 'CSS 속성을 직접 입력할 수 있습니다.',
    },
    ...sizeArgTypes,
    ...spacingArgTypes,
  },
} satisfies Meta<typeof Tab.Menus>;

export default meta;

const DAYS = ['월', '화', '수', '목', '금', '토', '일'] as const;

export const Default = ({ highlightColor, ...args }: MenusProps) => {
  return (
    <Tab id="menus-default" width={40}>
      <Tab.Menus gap={3} highlightColor={highlightColor} {...args}>
        {DAYS.map((day, index) => (
          <Tab.Menu key={day} label={day} index={index} />
        ))}
      </Tab.Menus>
    </Tab>
  );
};

export const MenusWithLineClamp = ({ highlightColor, ...args }: MenusProps) => {
  return Array.from({ length: 2 }, (_, index) => (
    <>
      {!!index && (
        <Text m={2} weight="bold" align="center">
          lineClamp를 적용한 경우 👇🏻
        </Text>
      )}
      <Tab id="menus-with-line-clamp" width={40} key={index}>
        <Tab.Menus gap={3} highlightColor={highlightColor} {...args} lineClamp={!!index}>
          {Array.from({ length: 4 }, (_, index) => (
            <Tab.Menu key={index} label="긴 라벨 이름입니다" index={index} />
          ))}
        </Tab.Menus>
      </Tab>
    </>
  ));
};
