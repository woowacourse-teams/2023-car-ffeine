import { useState } from 'react';

import { useExternalState, useSetExternalState } from '@utils/external-state';

import { mswModeActions, mswModeStore } from '@stores/config/mswModeStore';
import { serverStore } from '@stores/config/serverStore';

import ButtonNext from '@common/ButtonNext';
import Text from '@common/Text';

import DevelopmentServerControlButton from '@ui/DevelopmentServerControlButton';

const MswControlButton = () => {
  const [isMswMode, setIsMswMode] = useExternalState(mswModeStore);
  const setDevelopmentServer = useSetExternalState(serverStore);
  const switchMswMode = async () => {
    setIsMswMode(!isMswMode);
    if (isMswMode) {
      await mswModeActions.stopMsw();
    } else {
      setDevelopmentServer('localhost');
      await mswModeActions.startMsw();
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
