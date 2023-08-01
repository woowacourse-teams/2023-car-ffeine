import { useExternalValue } from '@utils/external-state';

import { modalActions, modalContentStore, modalOpenStore } from '@stores/modalStore';

import Modal from '@common/Modal';

const ModalContainer = () => {
  const isModalOpen = useExternalValue(modalOpenStore);
  const modalContent = useExternalValue(modalContentStore);

  return (
    <Modal isOpen={isModalOpen} onClose={() => modalActions.closeModal()}>
      {modalContent}
    </Modal>
  );
};

export default ModalContainer;
