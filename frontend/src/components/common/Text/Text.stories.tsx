import type { Meta } from '@storybook/react';
import styled from 'styled-components';

import Text from './Text';

const meta = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    tag: 'p',
    variant: 'body',
    align: 'left',
    color: '#333',
    lineClamp: 1,
    children: 'You forget a thousand things every day. Make sure this is one of them.',
  },
  argTypes: {
    tag: {
      description:
        '태그명(ex. header, h2, span)을 입력해 텍스트 컴포넌트의 태그를 바꿀 수 있습니다.',
    },
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
    color: {
      description: '선택한 색상에 따라 글씨색이 변합니다.',
    },
    lineClamp: {
      description: '블록 컨테이너 콘텐츠의 줄 수를 선택한 수만큼으로 제한할 수 있습니다.',
    },
    fontSize: {
      description:
        '글자 크기를 직접 조절할 수 있습니다.<br>❗글자 크기를 직접 설정할 경우, variant 적용시에도 글자 크기는 변하지 않습니다.',
    },
    weight: {
      description:
        '글자 두께를 직접 조절할 수 있습니다.<br>❗글자 두께를 직접 설정할 경우, variant 적용시에도 글자 두께는 변하지 않습니다.',
    },
    lineHeight: {
      control: {
        type: 'text',
      },
      description: '글자의 줄 간격을 조절할 수 있습니다.',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

interface Props {
  children: string;
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'title'
    | 'subtitle'
    | 'label'
    | 'body'
    | 'caption';
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

export const LineClamp = () => {
  return (
    <S.Container>
      <Text lineClamp={1}>
        You forget a thousand things every day. Make sure this is one of them.
      </Text>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    width: 30rem;
    line-height: 1.5;
  `,
};
