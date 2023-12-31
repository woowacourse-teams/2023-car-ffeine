import { useState } from 'react';

import Box from '@common/Box';
import ButtonNext from '@common/ButtonNext';
import type { ButtonNextProps } from '@common/ButtonNext/ButtonNext';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

const meta = {
  title: 'Components/ButtonNext',
  component: ButtonNext,
  tags: ['autodocs'],
  args: {
    children: 'Button',
  },
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description:
        '버튼 내용을 입력할 수 있습니다.<br> 원하는 컴포넌트, 텍스트 등을 넣을 수 있습니다.',
    },
    noTheme: {
      description: '테마를 끌 수 있습니다.',
    },
    variant: {
      description: '버튼의 형태를 정할 수 있습니다. 가득참, 빈, 텍스트 모드로 전환할 수 있습니다.',
    },
    size: {
      description: '사이즈를 정할 수 있습니다.',
    },
    disabled: {
      description: '버튼을 비활성화 할 수 있습니다.',
    },
    fullWidth: {
      description: '버튼을 가득 채울 수 있습니다.',
    },
    pill: {
      description: '버튼을 알약 모양으로 만들 수 있습니다.',
    },
    css: {
      description: '버튼에 CSS를 부여할 수 있습니다.',
    },
  },
};
export default meta;

export const Default = (args: ButtonNextProps) => {
  return <ButtonNext {...args}>Button</ButtonNext>;
};

export const Variant = () => {
  return (
    <>
      <ButtonNext variant="text">Text</ButtonNext>
      <ButtonNext variant="outlined">Outlined</ButtonNext>
      <ButtonNext variant="contained">Contained</ButtonNext>
    </>
  );
};

export const Clickable = () => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <>
      <Text>Click Me!</Text>
      <ButtonNext
        variant={isSelected ? 'outlined' : 'contained'}
        onClick={() => setIsSelected(!isSelected)}
      >
        {isSelected ? 'OFF' : 'ON'}
      </ButtonNext>
    </>
  );
};

export const Pill = () => {
  return (
    <>
      <ButtonNext pill>pill</ButtonNext>
      <ButtonNext>no pill</ButtonNext>
    </>
  );
};

export const Size = () => {
  return (
    <>
      <ButtonNext size="xs">sm</ButtonNext>
      <ButtonNext size="sm">sm</ButtonNext>
      <ButtonNext size="md">md</ButtonNext>
      <ButtonNext size="lg">lg</ButtonNext>
      <ButtonNext size="xl">xl</ButtonNext>
      <ButtonNext size="xxl">xxl</ButtonNext>
    </>
  );
};

export const Colors = () => {
  return (
    <>
      <Box>
        <ButtonNext variant="contained" color="primary">
          primary
        </ButtonNext>
        <ButtonNext variant="outlined" color="primary">
          primary
        </ButtonNext>
        <ButtonNext variant="text" color="primary">
          primary
        </ButtonNext>
      </Box>
      <Box>
        <ButtonNext variant="contained" color="secondary">
          secondary
        </ButtonNext>
        <ButtonNext variant="outlined" color="secondary">
          secondary
        </ButtonNext>
        <ButtonNext variant="text" color="secondary">
          secondary
        </ButtonNext>
      </Box>
      <Box>
        <ButtonNext variant="contained" color="info">
          info
        </ButtonNext>
        <ButtonNext variant="outlined" color="info">
          info
        </ButtonNext>
        <ButtonNext variant="text" color="info">
          info
        </ButtonNext>
      </Box>
      <Box>
        <ButtonNext variant="contained" color="success">
          success
        </ButtonNext>
        <ButtonNext variant="outlined" color="success">
          success
        </ButtonNext>
        <ButtonNext variant="text" color="success">
          success
        </ButtonNext>
      </Box>
      <Box>
        <ButtonNext variant="contained" color="warning">
          warning
        </ButtonNext>
        <ButtonNext variant="outlined" color="warning">
          warning
        </ButtonNext>
        <ButtonNext variant="text" color="warning">
          warning
        </ButtonNext>
      </Box>
      <Box>
        <ButtonNext variant="contained" color="error">
          error
        </ButtonNext>
        <ButtonNext variant="outlined" color="error">
          error
        </ButtonNext>
        <ButtonNext variant="text" color="error">
          error
        </ButtonNext>
      </Box>
      <Box>
        <ButtonNext variant="contained" color="dark">
          dark
        </ButtonNext>
        <ButtonNext variant="outlined" color="dark">
          dark
        </ButtonNext>
        <ButtonNext variant="text" color="dark">
          dark
        </ButtonNext>
      </Box>
      <Box>
        <ButtonNext variant="contained" color="light">
          light
        </ButtonNext>
        <ButtonNext variant="outlined" color="light">
          light
        </ButtonNext>
        <ButtonNext variant="text" color="light">
          light
        </ButtonNext>
      </Box>
      <ButtonNext>None</ButtonNext>
    </>
  );
};

export const Disabled = () => {
  return <ButtonNext disabled>사용할 수 없는 버튼</ButtonNext>;
};

export const NoTheme = () => {
  return <ButtonNext noTheme>테마가 모두 사라져버린 버튼</ButtonNext>;
};

export const FullWidth = () => {
  return <ButtonNext fullWidth>길쭉이</ButtonNext>;
};

export const FullWidthExample = () => {
  return (
    <>
      <Box mb={5}>
        <Text variant="title">with fullWidth</Text>
        <FlexBox nowrap>
          <ButtonNext color="error" fullWidth>
            취소
          </ButtonNext>
          <ButtonNext color="success" fullWidth>
            제출
          </ButtonNext>
        </FlexBox>
      </Box>
      <Box>
        <Text variant="title">without fullWidth</Text>
        <FlexBox nowrap>
          <ButtonNext color="error">취소</ButtonNext>
          <ButtonNext color="success">제출</ButtonNext>
        </FlexBox>
      </Box>
    </>
  );
};
