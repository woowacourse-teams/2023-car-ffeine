import styled from '@emotion/styled';
import type { Meta } from '@storybook/react';

import { getTypedObjectKeys } from '@utils/getTypedObjectKeys';

import Text from '@common/Text';
import { sizeArgTypes } from '@common/styles/size';
import { spacingArgTypes } from '@common/styles/spacing';

import type { ContainerProps } from './Container';
import Container from './Container';
import { ALIGNMENT, containerStyleArgTypes } from './style/container.style';

const meta = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    docs: {
      description: {
        component: '화면의 폭에 따라 내용의 최대 폭을 제한하고 중앙에 배치할 수 있습니다.',
      },
    },
  },
  args: {
    position: 'center',
    fluid: false,
    gutter: false,
    border: false,
    bg: '#d8eaf6',
  },
  argTypes: {
    children: {
      control: false,
    },
    tag: {
      control: false,
    },
    css: {
      description: 'CSS 속성을 직접 입력할 수 있습니다.',
    },
    ...containerStyleArgTypes,
    ...sizeArgTypes,
    ...spacingArgTypes,
  },
} satisfies Meta<typeof Container>;

export default meta;

const ContainerForStorybook = styled(Container)`
  height: 10rem;

  & > :first-of-type {
    width: fit-content;
    height: fit-content;
    padding: 0.4rem 1.6rem;

    font-weight: 500;

    background: #f5dce4;
    border: 2px solid #fb709f;
  }
`;

const alignmentList = getTypedObjectKeys(ALIGNMENT);

export const Default = ({ ...args }: ContainerProps) => {
  return <ContainerForStorybook {...args} />;
};

const PositionContainer = styled('div')`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

export const Position = () => {
  return (
    <PositionContainer>
      {alignmentList.map((alignment, index) => {
        return (
          <div key={index} css={{ padding: 8, border: '2px solid #333' }}>
            <Text tag="h3" variant="h6" mb={4}>
              {alignment}
            </Text>
            <ContainerForStorybook bg="#d8eaf6" position={alignment} maxWidth="sm" />
          </div>
        );
      })}
    </PositionContainer>
  );
};

export const Fluid = () => {
  return <ContainerForStorybook bg="#d8eaf6" fluid />;
};

export const Gutter = () => {
  return <ContainerForStorybook bg="#d8eaf6" gutter />;
};
