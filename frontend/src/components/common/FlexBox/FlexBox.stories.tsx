import type { Meta } from '@storybook/react';
import type { CSSProp } from 'styled-components';
import styled, { css } from 'styled-components';

import type { FlexBoxProps } from './FlexBox';
import FlexBox, { FLEX_BOX_ITEM_POSITION } from './FlexBox';

const Box = styled.div`
  width: 30%;
  padding: 1rem;
  border: 0.15rem solid #000;
  border-radius: 0.8rem;
`;

const Boxes = (tag?: 'li') => {
  return (
    <>
      <Box as={tag}>1 박스</Box>
      <Box as={tag}>2 박스</Box>
      <Box as={tag}>3 박스</Box>
      <Box as={tag}>1 박스</Box>
      <Box as={tag}>2 박스</Box>
      <Box as={tag}>3 박스</Box>
    </>
  );
};

const meta = {
  title: 'Components/FlexBox',
  component: FlexBox,
  tags: ['autodocs'],
  args: {
    tag: 'ul',
    justifyContent: 'center',
    alignItems: 'center',
    outlined: true,
    direction: 'row',
    nowrap: false,
    children: Boxes('li'),
    css: css`
      height: 24rem;
    `,
  },
  argTypes: {
    tag: {
      description: '태그명(ex. ul, section)을 입력해 플렉스 컨테이너의 태그를 바꿀 수 있습니다.',
    },
    justifyContent: {
      options: Object.keys({ ...FLEX_BOX_ITEM_POSITION, none: undefined }),
      control: {
        type: 'select',
      },
      description:
        '플렉스 컨테이너 안에 있는 아이템의 위치를 조절할 수 있습니다.<br>- direction이 row일 경우: 수평을 기준으로 아이템이 이동합니다.<br>- direction이 column일 경우: 수직을 기준으로 아이템이 이동합니다.',
    },
    alignItems: {
      options: Object.keys({ ...FLEX_BOX_ITEM_POSITION, none: undefined }),
      control: {
        type: 'select',
      },
      description:
        '플렉스 컨테이너 안에 있는 아이템의 위치를 조절할 수 있습니다.<br>- direction이 row일 경우: 수직을 기준으로 아이템이 이동합니다.<br>- direction이 column일 경우: 수평을 기준으로 아이템이 이동합니다.',
    },
    noRadius: {
      options: { none: false, all: 'all', top: 'top', bottom: 'bottom' },
      control: {
        type: 'select',
      },
      description: '특정 방향의 radius 속성을 제거할 수 있습니다.',
    },
    outlined: {
      control: {
        type: 'boolean',
      },
      description: 'true: 플렉스 컨테이너에 검은색 테두리가 생깁니다.',
    },
    background: {
      control: {
        type: 'color',
      },
      description: '선택한 색상에 따라 플렉스 컨테이너의 배경색이 변합니다.',
    },
    direction: {
      description: `row: 플렉스 컨테이너 안 아이템이 수직 방향으로 정렬됩니다. 기본값입니다.<br>column: 플렉스 컨테이너 안 아이템이 수직 방향으로 정렬됩니다.`,
    },
    nowrap: {
      description:
        'true: 플렉스 컨테이너, 아이템 크기에 상관없이 무조건 한 줄로 정렬합니다. 아이템의 width, height가 정해져 있지 않다면 플렉스 컨테이너의 크기만큼 늘어납니다.',
    },
    gap: {
      description:
        '숫자를 입력해 플렉스 컨테이너 안 아이템 간의 간격을 조절할 수 있습니다. `입력한 숫자 x 4px` 만큼 간격이 늘어납니다.',
    },
    rowGap: {
      description:
        '숫자를 입력해 플렉스 컨테이너 안 아이템 간의 행 높이를 조절할 수 있습니다. `입력한 숫자 x 4px` 만큼 간격이 늘어납니다.',
    },
    columnGap: {
      description:
        '숫자를 입력해 플렉스 컨테이너 안 아이템 간의 열 너비를 조절할 수 있습니다. `입력한 숫자 x 4px` 만큼 간격이 늘어납니다.',
    },
    children: {
      table: {
        disable: true,
      },
    },
    css: {
      description: '원하는 css를 적용할 수 있습니다.',
    },
  },
} satisfies Meta<typeof FlexBox>;

export default meta;

export const Default = (args: FlexBoxProps) => {
  return <FlexBox {...args} />;
};

interface SizeProps {
  width?: number;
  height?: number;
}

const size = ({ width, height }: SizeProps): CSSProp => css`
  width: ${width}rem;
  height: ${height}rem;
`;

export const JustifyContent = () => {
  return (
    <FlexBox nowrap columnGap={4} justifyContent="between">
      <FlexBox direction="column" rowGap={5}>
        <FlexBox outlined justifyContent="start" css={size({ height: 10 })}>
          {Boxes()}
        </FlexBox>
        <FlexBox outlined justifyContent="center" css={size({ height: 10 })}>
          {Boxes()}
        </FlexBox>
        <FlexBox outlined justifyContent="end" css={size({ height: 10 })}>
          {Boxes()}
        </FlexBox>
        <FlexBox outlined justifyContent="between" css={size({ height: 10 })}>
          {Boxes()}
        </FlexBox>
      </FlexBox>
      <FlexBox outlined direction="column" justifyContent="start" css={size({ width: 12 })}>
        {Boxes()}
      </FlexBox>
      <FlexBox outlined direction="column" justifyContent="center" css={size({ width: 12 })}>
        {Boxes()}
      </FlexBox>
      <FlexBox outlined direction="column" justifyContent="end" css={size({ width: 12 })}>
        {Boxes()}
      </FlexBox>
      <FlexBox outlined direction="column" justifyContent="between" css={size({ width: 12 })}>
        {Boxes()}
      </FlexBox>
    </FlexBox>
  );
};

export const AlignItems = () => {
  return (
    <FlexBox nowrap columnGap={4} justifyContent="between">
      <FlexBox direction="column" rowGap={5}>
        <FlexBox outlined alignItems="start" css={size({ height: 10 })}>
          {Boxes()}
        </FlexBox>
        <FlexBox outlined alignItems="center" css={size({ height: 10 })}>
          {Boxes()}
        </FlexBox>
        <FlexBox outlined alignItems="end" css={size({ height: 10 })}>
          {Boxes()}
        </FlexBox>
        <FlexBox outlined alignItems="between" css={size({ height: 10 })}>
          {Boxes()}
        </FlexBox>
      </FlexBox>
      <FlexBox outlined direction="column" alignItems="start" css={size({ width: 12, height: 26 })}>
        {Boxes()}
      </FlexBox>
      <FlexBox
        outlined
        direction="column"
        alignItems="center"
        css={size({ width: 12, height: 26 })}
      >
        {Boxes()}
      </FlexBox>
      <FlexBox outlined direction="column" alignItems="end" css={size({ width: 12, height: 26 })}>
        {Boxes()}
      </FlexBox>
      <FlexBox
        outlined
        direction="column"
        alignItems="between"
        css={size({ width: 12, height: 26 })}
      >
        {Boxes()}
      </FlexBox>
    </FlexBox>
  );
};

export const Gap = () => {
  return (
    <Container>
      <FlexBox justifyContent="center" rowGap={4} columnGap={8}>
        {Boxes()}
      </FlexBox>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;

  &:first-child {
    margin-top: 0;
  }

  & > button {
    margin-right: 20px;
  }
`;
