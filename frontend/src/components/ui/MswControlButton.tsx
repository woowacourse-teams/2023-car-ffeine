import { useState } from 'react';

import { useSetExternalState } from '@utils/external-state';

import { developmentServerStore } from '@stores/developmentServerStore';

import Button from '@common/Button';
import Text from '@common/Text';

import DevelopmentServerControlButton from '@ui/DevelopmentServerControlButton';

import { startMsw, stopMsw } from '../../mocks/configureMsw';

const MswControlButton = () => {
  const [isMswMode, setMswMode] = useState(true);
  const setDevelopmentServer = useSetExternalState(developmentServerStore);
  const switchMswMode = async () => {
    setMswMode(!isMswMode);
    if (isMswMode) {
      await stopMsw();
    } else {
      setDevelopmentServer('localhost');
      await startMsw();
    }
  };

  return (
    <>
      <Button onClick={() => switchMswMode()}>
        <>
          <Text align="center">MSW</Text>
          <Text align="center">{isMswMode ? 'ON' : 'OFF'}</Text>
        </>
      </Button>
      {!isMswMode && <DevelopmentServerControlButton />}
    </>
  );
};

export default MswControlButton;
