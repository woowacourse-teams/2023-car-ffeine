import { useExternalState, useSetExternalState } from '@utils/external-state';
import { getAPIEndPoint } from '@utils/login';

import { mswModeActions, mswModeStore } from '@stores/config/mswModeStore';
import { serverStore } from '@stores/config/serverStore';

import ButtonNext from '@common/ButtonNext';
import Text from '@common/Text';

import DevelopmentServerControlButton from '@ui/DevelopmentServerControlButton';

import { displayNone } from '@style/mediaQuery';

const MswControlButton = () => {
  const [isMswMode, setIsMswMode] = useExternalState(mswModeStore);
  const setDevelopmentServer = useSetExternalState(serverStore);
  const switchMswMode = async () => {
    setIsMswMode(!isMswMode);
    if (isMswMode) {
      await mswModeActions.stopMsw();
    } else {
      setDevelopmentServer(getAPIEndPoint() === 'http://localhost:8080/api' ? 'localhost' : 'dain');
      await mswModeActions.startMsw();
    }
  };

  return (
    <>
      <ButtonNext
        variant="text"
        color={isMswMode ? 'primary' : 'error'}
        css={displayNone}
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
