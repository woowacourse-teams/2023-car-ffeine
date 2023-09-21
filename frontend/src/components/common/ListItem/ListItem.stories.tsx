import type { Meta } from '@storybook/react';

import List from '../List';
import Text from '../Text';
import type { ListItemProps } from './ListItem';
import ListItem from './index';

const meta = {
  title: 'Components/ListItem',
  component: ListItem,
  tags: ['autodocs'],
  args: {
    children: 'ListItem',
    divider: false,
    noLastDivider: false,
  },
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: '이 컴포넌트는 반드시 `<List/>`로 감싸야 합니다.',
    },
    divider: {
      description: 'true: 하단에 밑줄을 그을 수 있습니다.',
    },
    noLastDivider: {
      description: 'true: 마지막 리스트 아이템의 하단 밑줄을 제거할 수 있습니다.',
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
        <ListItem>
          <Text variant="body">메뉴1</Text>
        </ListItem>
        <ListItem>
          <Text variant="body">메뉴2</Text>
        </ListItem>
        <ListItem divider>
          <Text variant="body">메뉴3</Text>
        </ListItem>
        <ListItem>
          <Text variant="body">로그아웃</Text>
        </ListItem>
      </List>
    </div>
  );
};
