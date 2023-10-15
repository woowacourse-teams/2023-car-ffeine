import type { Meta } from '@storybook/react';
import styled from 'styled-components';

import FlexBox from '@common/FlexBox';
import { sizeArgTypes } from '@common/styles/common';
import { spacingArgTypes } from '@common/styles/spacing';

import type { FlexItemProps } from './FlexItem';
import FlexItem from './FlexItem';

const meta = {
  title: 'Layout/Flex/FlexItem',
  component: FlexItem,
  parameters: {
    docs: {
      description: {
        component: 'Flex Box의 자식 컴포넌트입니다. 각각의 너비와 위치 등을 조절할 수 있습니다.',
      },
    },
  },
  args: {
    children: 'Box',
    order: 0,
  },
  argTypes: {
    flex: {
      description: `Flex Item 크기를 조절할 수 있음
      <br />숫자 하나만 입력할 경우 (flex="8"),
      <br />-&nbsp; **flex-grow**
      <br />단위 포함 숫자 하나만 입력할 경우 (flex="8px"),
      <br />-&nbsp; **flex-basis** 
      <br />숫자만 두 개 입력할 경우 (flex="2 2"),
      <br />-&nbsp; **flex-grow | flex-shrink** 
      <br />단위 포함 숫자 두 개를 입력할 경우 (flex="1 30px"),
      <br />-&nbsp; **flex-grow | flex-basis** 
      <br />세 개를 입력할 경우 (flex="1 2 30px"),
      <br />-&nbsp; **flex-grow | flex-shrink | flex-basis**`,
    },
    children: {
      control: {
        type: 'text',
      },
    },
    tag: {
      control: false,
    },
    css: {
      description: 'CSS 속성을 직접 입력할 수 있습니다.',
    },
    ...sizeArgTypes,
    ...spacingArgTypes,
  },
} satisfies Meta<typeof FlexItem>;

export default meta;

const ContainerForStorybook = styled(FlexBox)`
  height: 10rem;
  border: 2px solid #32affd;

  & > * {
    width: fit-content;
    padding: 0.4rem 1.6rem;
    border: 2px solid #fb709f;
  }
`;

export const Default = ({ children, ...args }: FlexItemProps) => {
  return (
    <ContainerForStorybook nowrap layout="center" gap={2}>
      {Array.from({ length: 4 }, (_, index) => {
        return (
          <FlexItem key={index} order={index + 1} grow={1} shrink={1}>
            {children}
            {index + 1}
          </FlexItem>
        );
      })}
      <FlexItem {...args}>Control Me!</FlexItem>
    </ContainerForStorybook>
  );
};

export const DirectionColumn = ({ children, ...args }: FlexItemProps) => {
  return (
    <ContainerForStorybook nowrap layout="center" direction="column" gap={2} height={1.8}>
      {Array.from({ length: 2 }, (_, index) => {
        return (
          <FlexItem key={index} order={index + 1} shrink={1}>
            {children}
            {index + 1}
          </FlexItem>
        );
      })}
      <FlexItem {...args}>Control Me!</FlexItem>
    </ContainerForStorybook>
  );
};
