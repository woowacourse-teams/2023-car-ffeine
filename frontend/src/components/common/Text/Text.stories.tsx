import type { Meta } from '@storybook/react';

import Text from './Text';

const meta = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    variant: 'body',
    align: 'left',
    mb: 0,
    children: 'You forget a thousand things every day. Make sure this is one of them.',
  },
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: '원하는 글자를 입력해 테스트를 할 수 있습니다.',
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
        subtitle: 'subtitle',
        label: 'label',
        body: 'body',
        caption: 'caption',
      },
      control: {
        type: 'select',
      },
      description: '글자 크기 및 두께를 바꿀 수 있습니다. 기본값은 body입니다.',
    },
    mb: {
      control: {
        type: 'number',
      },
      description:
        '숫자를 입력해 글자의 하단 간격을 조절할 수 있습니다. `입력한 숫자 x 4px` 만큼 간격이 늘어납니다.<br> 기본값은 4px 입니다.',
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
      description: '선택한 위치에 따라 글자가 정렬됩니다.',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

interface Props {
  children: string;
  variant: string;
}

export const Default = (args: Props) => {
  return (
    <>
      <Text {...args} />
      <Text {...args} />
    </>
  );
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
      <Text variant="subtitle">Subtitle</Text>
      <Text variant="label">Label</Text>
      <Text variant="body">Body Text</Text>
      <Text variant="caption">Caption Text</Text>
      <Text>You forget a thousand things every day. Make sure this is one of them.</Text>
    </>
  );
};

export const MarginBottom = () => {
  return (
    <>
      <Text variant="h1" mb={5}>
        Heading 1
      </Text>
      <Text variant="h1" mb={10}>
        Heading 1
      </Text>
      <Text variant="h1">Heading 1</Text>
    </>
  );
};
