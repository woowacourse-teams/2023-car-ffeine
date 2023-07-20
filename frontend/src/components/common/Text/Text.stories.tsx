import type { Meta } from '@storybook/react';

import Text from './Text';

const meta = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    children: 'You forget a thousand things every day. Make sure this is one of them.',
  },
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: '글자를 입력할 수 있어요',
    },
    variant: {
      options: {
        none: false,
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
        title: 'title',
        subtitle1: 'subtitle1',
        subtitle2: 'subtitle2',
        body: 'body',
        caption: 'caption',
      },
      control: {
        type: 'select',
      },
      description: '글자의 기본 효과를 설정합니다.',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

interface Props {
  children: string;
  variant: string;
}

export const Default = (args: Props) => {
  return <Text {...args} />;
};

export const Sizes = () => {
  return (
    <>
      <div>
        <div>
          <Text variant="h1">Heading 1</Text>
        </div>
        <div>
          <Text variant="h2">Heading 2</Text>
        </div>
        <div>
          <Text variant="h3">Heading 3</Text>
        </div>
        <div>
          <Text variant="h4">Heading 4</Text>
        </div>
        <div>
          <Text variant="h5">Heading 5</Text>
        </div>
        <div>
          <Text variant="h6">Heading 6</Text>
        </div>
        <div>
          <Text variant="title">Title</Text>
        </div>
        <div>
          <Text variant="subtitle1">Subtitle 1</Text>
        </div>
        <div>
          <Text variant="subtitle2">Subtitle 2</Text>
        </div>
        <div>
          <Text variant="body">Body Text</Text>
        </div>
        <div>
          <Text variant="caption">Caption Text</Text>
        </div>
        <div>
          <Text>You forget a thousand things every day. Make sure this is one of them.</Text>
        </div>
      </div>
    </>
  );
};
