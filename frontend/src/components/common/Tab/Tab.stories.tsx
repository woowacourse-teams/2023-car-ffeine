import type { Meta } from '@storybook/react';

import { sizeArgTypes } from '@common/styles/common';
import { spacingArgTypes } from '@common/styles/spacing';

import type { TabProps } from './Tab';
import Tab from './Tab';

const meta = {
  title: 'Tab/Tab',
  component: Tab,
  parameters: {
    docs: {
      description: {
        component: `각 Tab 메뉴에 따라 다른 내용을 보여줄 수 있습니다. 원하는 Menu와 Content를 index로 연결하세요.
          <br />Tab은 FlexContainer로 구성되었습니다. 따라서 FlexContainer의 속성을 그대로 사용할 수 있습니다.`,
      },
    },
  },
  args: {
    initialIndex: 0,
    vertical: false,
  },
  argTypes: {
    css: {
      description: 'CSS 속성을 직접 입력할 수 있습니다.',
    },
    ...sizeArgTypes,
    ...spacingArgTypes,
  },
} satisfies Meta<typeof Tab>;

export default meta;

const DAYS = ['월', '화', '수', '목', '금', '토', '일'] as const;
const ENG_DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const;

export const Default = ({ ...args }) => {
  return (
    <Tab {...args} id="default">
      <Tab.Menus highlightColor="#32affd">
        {DAYS.map((day, index) => (
          <Tab.Menu key={day} label={day} index={index} />
        ))}
      </Tab.Menus>
      {DAYS.map((_, index) => (
        <Tab.Content key={index} index={index}>
          내용 {index}
        </Tab.Content>
      ))}
    </Tab>
  );
};

export const Vertical = ({ vertical, ...args }: TabProps) => {
  const fixedVertical = vertical || true;

  return (
    <Tab vertical={fixedVertical} width={40} {...args} id="vertical">
      <Tab.Menus width={4.6} gap={3}>
        {ENG_DAYS.map((day, index) => (
          <Tab.Menu key={day} label={day} index={index} />
        ))}
      </Tab.Menus>
      {ENG_DAYS.map((_, index) => (
        <Tab.Content key={index} index={index}>
          <p>내용 {index}</p>
        </Tab.Content>
      ))}
    </Tab>
  );
};

export const InitialIndex = ({ initialIndex, ...args }: TabProps) => {
  const fixedInitialIndex = initialIndex || 3;

  return (
    <Tab width={40} initialIndex={fixedInitialIndex} {...args} id="initialIndex">
      <Tab.Menus>
        {ENG_DAYS.map((day, index) => (
          <Tab.Menu key={day} label={day} index={index} />
        ))}
      </Tab.Menus>
      {ENG_DAYS.map((_, index) => (
        <Tab.Content key={index} index={index}>
          <p>내용 {index}</p>
        </Tab.Content>
      ))}
    </Tab>
  );
};

export const SeveralTabs = () => {
  return Array.from({ length: 3 }, (_, index) => {
    return (
      <Tab key={index} width={40} mb={7} initialIndex={index} id={`tab-${index}`}>
        <Tab.Menus>
          {ENG_DAYS.map((day, index) => (
            <Tab.Menu key={day} label={day} index={index} />
          ))}
        </Tab.Menus>
        {ENG_DAYS.map((_, index) => (
          <Tab.Content key={index} index={index}>
            <p>내용 {index}</p>
          </Tab.Content>
        ))}
      </Tab>
    );
  });
};

export const TabWithLayoutProp = ({ ...args }) => {
  return (
    <Tab
      width={40}
      height={20}
      layout="centerLeft"
      css={{ border: '1px solid #000' }}
      {...args}
      id="tab-with-layout"
    >
      <Tab.Menus width={30}>
        {ENG_DAYS.map((day, index) => (
          <Tab.Menu key={day} label={day} index={index} />
        ))}
      </Tab.Menus>
      {ENG_DAYS.map((_, index) => (
        <Tab.Content key={index} index={index}>
          <p>내용 {index}</p>
        </Tab.Content>
      ))}
    </Tab>
  );
};
