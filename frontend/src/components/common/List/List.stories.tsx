import type { Meta } from '@storybook/react';
import styled from 'styled-components';

import ListItem from '@common/ListItem';
import Text from '@common/Text';

import type { ListProps } from './List';
import List from './List';

const meta = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  args: {
    children: 'List',
  },
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: '리스트의 하위 요소는 <ListItem/> 컴포넌트가 와야합니다.',
    },
  },
} satisfies Meta<typeof List>;

export default meta;

export const Default = (args: ListProps) => {
  return <List {...args} />;
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
