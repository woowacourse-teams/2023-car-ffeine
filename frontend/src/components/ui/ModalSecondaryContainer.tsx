import { useExternalValue } from '@utils/external-state';

import {
  modalSecondaryActions,
  modalSecondaryContentStore,
  modalSecondaryOpenStore,
} from '@stores/layout/modalSecondaryStore';

import Modal from '@common/Modal';

const ModalSecondaryContainer = () => {
  const isModalOpen = useExternalValue(modalSecondaryOpenStore);
  const modalContent = useExternalValue(modalSecondaryContentStore);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => modalSecondaryActions.closeModal()}
      css={{ zIndex: 10001 }}
      staticBackdrop
    >
      {modalContent}
    </Modal>
  );
};

export default ModalSecondaryContainer;
