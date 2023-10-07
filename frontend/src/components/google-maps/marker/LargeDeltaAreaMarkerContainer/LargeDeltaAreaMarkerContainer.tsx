import { useEffect } from 'react';

import { warningModalActions } from '@stores/layout/warningModalStore';

import ZoomWarningModal from '@ui/WarningModal';

const LargeDeltaAreaMarkerContainer = () => {
  useEffect(() => {
    warningModalActions.openModal(<ZoomWarningModal />);

    return () => {
      warningModalActions.closeModal();
    };
  }, []);
  return <></>;
};

export default LargeDeltaAreaMarkerContainer;
