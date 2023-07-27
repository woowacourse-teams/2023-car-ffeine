import { useState } from 'react';

import Button from '@common/Button';
import Text from '@common/Text';

import { startMsw, stopMsw } from '../../mocks/configureMsw';

const MswControlButton = () => {
  const [isMswMode, setMswMode] = useState(true);
  const switchMswMode = async () => {
    setMswMode(!isMswMode);
    if (isMswMode) {
      await stopMsw();
    } else {
      await startMsw();
    }
  };

  return (
    <Button onClick={() => switchMswMode()}>
      <>
        <Text>MSW</Text>
        <Text>{isMswMode ? 'ON' : 'OFF'}</Text>
      </>
    </Button>
  );
};

export default MswControlButton;
