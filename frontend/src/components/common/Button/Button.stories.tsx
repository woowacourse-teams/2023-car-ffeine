import type { Meta } from '@storybook/react';
import styled from 'styled-components';

import { BUTTON_PADDING_SIZE } from '@common/Button/Button.style';

import type { ButtonProps } from './Button';
import Button from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    width: 'auto',
    height: 'auto',
    outlined: true,
    shadow: false,
    hover: true,
    size: 'sm',
    onClick: () => {
      alert('click');
    },
  },
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description:
        '버튼 내용을 입력할 수 있습니다.<br> 원하는 컴포넌트, 텍스트 등을 넣을 수 있습니다.',
    },
    width: {
      description:
        '숫자를 입력하면 `입력한 숫자 x 10px` 만큼 버튼 너비가 늘어납니다.<br> 단위를 포함해 문자(ex. "100%")로 입력하면 원하는 만큼 버튼 너비가 늘어납니다.',
    },
    height: {
      description:
        '숫자를 입력하면 `입력한 숫자 x 10px` 버튼 높이가 늘어납니다.<br> 단위를 포함해 문자(ex. "100%")로 입력하면 원하는 만큼 버튼 높이가 늘어납니다.',
    },
    variant: {
      options: { none: false, pill: 'pill' },
      control: {
        type: 'select',
      },
      description: '버튼 모양을 변경할 수 있습니다.',
    },
    noRadius: {
      options: { none: false, all: 'all', top: 'top', bottom: 'bottom' },
      control: {
        type: 'select',
      },
      description: '특정 방향의 radius 속성을 제거할 수 있습니다.',
    },
    shadow: {
      control: {
        type: 'boolean',
      },
      description: 'true: 버튼 주변으로 그림자가 생깁니다.',
    },
    size: {
      options: Object.keys({ ...BUTTON_PADDING_SIZE, none: undefined }),
      control: {
        type: 'select',
      },
      description: '선택한 사이즈에 따라 버튼의 크기가 변합니다.',
    },
    outlined: {
      control: {
        type: 'boolean',
      },
      description: 'true: 버튼에 검은색 테두리가 생깁니다.',
    },
    background: {
      control: {
        type: 'color',
      },
      description: '선택한 색상에 따라 버튼의 배경색이 변합니다.',
    },
    hover: {
      description: '호버했을 때 버튼 배경색이 변합니다.',
    },
    css: {
      description: '원하는 css를 적용할 수 있습니다.',
    },
    onClick: {
      control: false,
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

export const Default = (args: ButtonProps) => {
  return <Button {...args} />;
};

export const Sizes = () => {
  return (
    <>
      <Container>
        <Button outlined size="xs">
          Button
        </Button>
        <Button outlined size="sm">
          Button
        </Button>
        <Button outlined size="md">
          Button
        </Button>
        <Button outlined size="lg">
          Button
        </Button>
        <Button outlined size="xl">
          Button
        </Button>
      </Container>
      <Container>
        <Button outlined variant="pill" size="xs">
          Button
        </Button>
        <Button outlined variant="pill" size="sm">
          Button
        </Button>
        <Button outlined variant="pill" size="md">
          Button
        </Button>
        <Button outlined variant="pill" size="lg">
          Button
        </Button>
        <Button outlined variant="pill" size="xl">
          Button
        </Button>
      </Container>
    </>
  );
};

export const Styles = () => {
  return (
    <Container>
      <Button outlined size="sm">
        Button
      </Button>
      <Button shadow size="sm">
        Button
      </Button>
      <Button outlined size="sm" noRadius="all">
        Button
      </Button>
      <Button outlined size="sm" noRadius="top">
        Button
      </Button>
      <Button outlined size="sm" noRadius="bottom">
        Button
      </Button>
      <Button outlined size="sm" variant="pill">
        Button
      </Button>
      <Button shadow size="sm" variant="pill">
        Button
      </Button>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 2rem;

  &:first-child {
    margin-top: 0;
  }

  & > button {
    margin-right: 2rem;
  }
`;
