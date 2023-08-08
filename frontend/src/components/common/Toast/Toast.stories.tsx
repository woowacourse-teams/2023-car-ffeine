import type { Meta } from '@storybook/react';

import { useExternalValue } from '@utils/external-state';

import { toastActions, toastListStore } from '@stores/layout/toastStore';

import ButtonNext from '@common/ButtonNext';

import type { ToastProps } from './Toast';
import Toast from './Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: {
    message: '사용자에게 보여줄 메시지를 입력하세요',
    position: 'bottom-center',
    color: 'success',
  },
  argTypes: {
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

  return (
    <>
      <ButtonNext color="dark" onClick={() => showToast(args.message, args.position, args.color)}>
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
