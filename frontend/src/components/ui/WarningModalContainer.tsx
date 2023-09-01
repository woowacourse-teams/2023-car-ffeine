import { css } from 'styled-components';

import { useExternalValue } from '@utils/external-state';

import { navigationBarPanelStore } from '@stores/layout/navigationBarPanelStore';
import {
  warningModalActions,
  warningModalContentStore,
  warningModalOpenStore,
} from '@stores/layout/warningModalStore';

import Modal from '@common/Modal';

import { NAVIGATOR_PANEL_WIDTH } from '@constants';

const WarningModalContainer = () => {
  const isModalOpen = useExternalValue(warningModalOpenStore);
  const modalContent = useExternalValue(warningModalContentStore);
  const { basePanel, lastPanel } = useExternalValue(navigationBarPanelStore);
  const navigationComponentWidth =
    (basePanel === null ? 0 : NAVIGATOR_PANEL_WIDTH) +
    (lastPanel === null ? 0 : NAVIGATOR_PANEL_WIDTH);

  return (
    <Modal
      noOverflowHidden
      noBackdrop
      isOpen={isModalOpen}
      onClose={() => warningModalActions.closeModal()}
      css={warningModalCss(navigationComponentWidth)}
    >
      {modalContent}
    </Modal>
  );
};

const warningModalCss = (navigationComponentWidth: number) => css`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9;

  transform: translate(calc(-50% + ${navigationComponentWidth / 2}rem), -50%);
  margin: 0;

  background: transparent;
`;

export default WarningModalContainer;
