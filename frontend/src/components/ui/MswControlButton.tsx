import { useState } from 'react';

import Button from '@common/Button';
import Text from '@common/Text';

import { startMsw, stopMsw } from '../../mocks/configureMsw';

const MswControlButton = () => {
  const [mswMode, setMswMode] = useState(true);
  const switchMswMode = async () => {
    setMswMode(!mswMode);
    if (mswMode) {
      await stopMsw();
    } else {
      await startMsw();
    }
  };

  return (
    <Button onClick={() => switchMswMode()}>
      <>
        <Text>MSW</Text>
        <Text>{mswMode ? 'ON' : 'OFF'}</Text>
      </>
    </Button>
  );
};

export default MswControlButton;
