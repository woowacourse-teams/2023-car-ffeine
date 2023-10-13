import type { Meta } from '@storybook/react';

import type { ContentProps } from './Content';
import Tab from './Tab';

const meta = {
  title: 'Tab/Content',
  tags: ['autodocs'],
  component: Tab.Content,
  parameters: {
    docs: {
      description: {
        component: `Tab의 Content는 FlexItem으로 구성되었습니다. 따라서 FlexItem의 속성을 그대로 사용할 수 있습니다.`,
      },
    },
  },
  args: {
    index: 0,
    children: '내용',
  },
  argTypes: {
    children: {
      description: `탭 메뉴를 클릭했을 때 보여줄 내용<br />리액트 컴포넌트도 넣을 수 있음`,
    },
    css: {
      description: 'CSS 속성을 직접 입력할 수 있습니다.',
    },
  },
} satisfies Meta<typeof Tab.Content>;

export default meta;

const DAYS = ['월', '화', '수', '목', '금', '토', '일'] as const;

export const Default = ({ children, ...args }: ContentProps) => {
  return (
    <Tab id="content-default">
      <Tab.Menus gap={3}>
        {DAYS.map((day, index) => (
          <Tab.Menu key={day} label={day} index={index} />
        ))}
      </Tab.Menus>
      <Tab.Content {...args}>{children}</Tab.Content>
    </Tab>
  );
};
