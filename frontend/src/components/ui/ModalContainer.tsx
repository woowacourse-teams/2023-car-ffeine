import { useExternalValue } from '@utils/external-state';

import { modalActions, modalContentStore, modalOpenStore } from '@stores/layout/modalStore';

import Modal from '@common/Modal';

const ModalContainer = () => {
  const isModalOpen = useExternalValue(modalOpenStore);
  const modalContent = useExternalValue(modalContentStore);

  return (
    <Modal isOpen={isModalOpen} onClose={() => modalActions.closeModal()} css={{ zIndex: 10000 }}>
      {modalContent}
    </Modal>
  );
};

export default ModalContainer;
