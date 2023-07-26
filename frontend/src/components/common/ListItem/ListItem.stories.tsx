import type { Meta } from '@storybook/react';
import styled from 'styled-components';

import List from '@common/List';
import ListItem from '@common/ListItem';
import type { ListItemProps } from '@common/ListItem/ListItem';
import Text from '@common/Text';

const meta = {
  title: 'Components/ListItem',
  component: ListItem,
  tags: ['autodocs'],
  args: {
    children: 'ListItem',
    divider: false,
    clickable: false,
  },
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: '이 컴포넌트는 반드시 `<List/>`로 감싸야 합니다.',
    },
    divider: {
      control: {
        type: 'boolean',
      },
      description: '하단에 밑줄을 그을 수 있습니다.',
    },
    clickable: {
      control: {
        type: 'boolean',
      },
      description: 'hover 효과를 줘서 마우스로 클릭할 수 있음을 알립니다.',
    },
  },
} satisfies Meta<typeof ListItem>;

export default meta;

export const Default = (args: ListItemProps) => {
  return (
    <List>
      <ListItem {...args} />
      <ListItem {...args} />
    </List>
  );
};

export const Menu = () => {
  return (
    <div style={{ width: '150px' }}>
      <List border>
        <ListItem clickable>
          <Text variant="body">메뉴1</Text>
        </ListItem>
        <ListItem clickable>
          <Text variant="body">메뉴2</Text>
        </ListItem>
        <ListItem clickable divider>
          <Text variant="body">메뉴3</Text>
        </ListItem>
        <ListItem clickable>
          <Text variant="body">로그아웃</Text>
        </ListItem>
      </List>
    </div>
  );
};
