import { startMsw, stopMsw } from '@mocks/configureMsw';

import { useState } from 'react';

import { useSetExternalState } from '@utils/external-state';

import { serverStore } from '@stores/serverStore';

import ButtonNext from '@common/ButtonNext';
import Text from '@common/Text';

import DevelopmentServerControlButton from '@ui/DevelopmentServerControlButton';

const MswControlButton = () => {
  const [isMswMode, setMswMode] = useState(true);
  const setDevelopmentServer = useSetExternalState(serverStore);
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
      <ButtonNext
        variant="text"
        color={isMswMode ? 'primary' : 'error'}
        onClick={() => switchMswMode()}
      >
        <>
          <Text align="center">MSW</Text>
          <Text align="center">{isMswMode ? 'ON' : 'OFF'}</Text>
        </>
      </ButtonNext>
      {!isMswMode && <DevelopmentServerControlButton />}
    </>
  );
};

export default MswControlButton;
