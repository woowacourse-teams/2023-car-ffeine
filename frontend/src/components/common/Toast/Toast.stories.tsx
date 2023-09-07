import type { Meta } from '@storybook/react';
import { styled } from 'styled-components';

import { toastActions, toastListStore } from '../../../stores/layout/toastStore';
import type { Color } from '../../../types';
import { useExternalValue } from '../../../utils/external-state';
import ButtonNext from '../ButtonNext';
import Text from '../Text';
import type { ToastProps } from './Toast';
import Toast, { getToastColor } from './Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: {
    toastId: 0,
    message: '사용자에게 보여줄 메시지를 입력하세요',
    position: 'bottom-center',
    color: 'success',
  },
  argTypes: {
    toastId: {
      description: '토스트 고유의 id 입니다.',
    },
    message: {
      description: '원하는 글자를 입력해 테스트를 할 수 있습니다.',
    },
    position: {
      description: '선택한 위치에 따라 토스트가 나오는 방향을 선택할 수 있습니다.',
    },
    color: {
      description: '선택한 색상에 따라 토스트의 색상이 변합니다.',
    },
    css: {
      description: '원하는 css를 적용할 수 있습니다.',
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;

export const Default = (args: ToastProps) => {
  const toastItems = useExternalValue<ToastProps[]>(toastListStore);
  const { showToast } = toastActions;

  const { message, position, color } = args;

  return (
    <>
      <ButtonNext color="dark" onClick={() => showToast(message, color, position)}>
        나와라 토스트!
      </ButtonNext>
      <>
        {toastItems.map((toastItem) => (
          <Toast key={toastItem.toastId} {...toastItem} />
        ))}
      </>
    </>
  );
};

export const Colors = () => {
  return (
    <>
      <Text variant="h5" mb={4}>
        Primary
      </Text>
      <S.Toast color="primary">이삭 토스트</S.Toast>
      <Text variant="h5" mb={4}>
        Secondary
      </Text>
      <S.Toast color="secondary">이삭 토스트</S.Toast>
      <Text variant="h5" mb={4}>
        Success
      </Text>
      <S.Toast color="success">이삭 토스트</S.Toast>
      <Text variant="h5" mb={4}>
        Warning
      </Text>
      <S.Toast color="warning">이삭 토스트</S.Toast>
      <Text variant="h5" mb={4}>
        Error
      </Text>
      <S.Toast color="error">이삭 토스트</S.Toast>
      <Text variant="h5" mb={4}>
        Info
      </Text>
      <S.Toast color="info">이삭 토스트</S.Toast>
      <Text variant="h5" mb={4}>
        Light
      </Text>
      <S.Toast color="light">이삭 토스트</S.Toast>
      <Text variant="h5" mb={4}>
        Dark
      </Text>
      <S.Toast color="dark">이삭 토스트</S.Toast>
    </>
  );
};

const S = {
  Toast: styled.div<{ color: Color }>`
    width: max-content;
    max-width: 40rem;
    padding: 1.2rem 2.4rem;
    font-size: 1.5rem;
    text-align: center;
    word-break: keep-all;
    line-height: 1.5;
    border-radius: 28px;
    font-weight: 500;
    color: #fff;
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }

    ${({ color }) => getToastColor(color)}
  `,
};
