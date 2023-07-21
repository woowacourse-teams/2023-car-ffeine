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
      description: '글자의 기본 효과를 설정합니다. 프롭이 없는 경우에는 body의 속성이 주어집니다.',
    },
    marginBottom: {
      options: {
        none: false,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
      },
      control: {
        type: 'select',
      },
      description:
        '글자의 하단 간격을 조절합니다. 프롭이 없는 경우에는 기본적으로 약간의 간격이 주어집니다.',
    },
    align: {
      options: {
        none: false,
        center: 'center',
        left: 'left',
        right: 'right',
      },
      control: {
        type: 'select',
      },
      description: '글자를 정렬합니다.',
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
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="h5">Heading 5</Text>
      <Text variant="h6">Heading 6</Text>
      <Text variant="title">Title</Text>
      <Text variant="subtitle1">Subtitle 1</Text>
      <Text variant="subtitle2">Subtitle 2</Text>
      <Text variant="body">Body Text</Text>
      <Text variant="caption">Caption Text</Text>
      <Text>You forget a thousand things every day. Make sure this is one of them.</Text>
    </>
  );
};

export const MarginBottoms = () => {
  return (
    <>
      <Text variant="h1" marginBottom={5}>
        Heading 1
      </Text>
      <Text variant="h2" marginBottom={4}>
        Heading 2
      </Text>
      <Text variant="h3" marginBottom={3}>
        Heading 3
      </Text>
      <Text variant="h4" marginBottom={2}>
        Heading 4
      </Text>
      <Text variant="h5" marginBottom={1}>
        Heading 5
      </Text>
      <Text variant="h6" marginBottom={5}>
        Heading 6
      </Text>
      <Text variant="title" marginBottom={4}>
        Title
      </Text>
      <Text variant="subtitle1" marginBottom={3}>
        Subtitle 1
      </Text>
      <Text variant="subtitle2" marginBottom={2}>
        Subtitle 2
      </Text>
      <Text variant="body" marginBottom={1}>
        Body Text
      </Text>
      <Text variant="caption">Caption Text</Text>
      <Text>You forget a thousand things every day. Make sure this is one of them.</Text>
    </>
  );
};

export const Aligns = () => {
  return (
    <>
      <Text variant="h1" align="center">
        Heading 1
      </Text>
      <Text variant="h2" align="left">
        Heading 2
      </Text>
      <Text variant="h3" align="right">
        Heading 3
      </Text>
      <Text variant="h4" align="center">
        Heading 4
      </Text>
      <Text variant="h5" align="left">
        Heading 5
      </Text>
      <Text variant="h6" align="right">
        Heading 6
      </Text>
      <Text variant="title">Title</Text>
      <Text variant="subtitle1">Subtitle 1</Text>
      <Text variant="subtitle2">Subtitle 2</Text>
      <Text variant="body">Body Text</Text>
      <Text variant="caption">Caption Text</Text>
      <Text>You forget a thousand things every day. Make sure this is one of them.</Text>
    </>
  );
};
