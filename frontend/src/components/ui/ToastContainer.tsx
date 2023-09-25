import { useExternalValue } from '@utils/external-state';

import { toastListStore } from '@stores/layout/toastStore';

import type { ToastProps } from '@common/Toast/Toast';
import Toast from '@common/Toast/Toast';

const ToastContainer = () => {
  const toastItems = useExternalValue<ToastProps[]>(toastListStore);

  return toastItems.map((toastItem) => <Toast key={toastItem.toastId} {...toastItem} />);
};

export default ToastContainer;
