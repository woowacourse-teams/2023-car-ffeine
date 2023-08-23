import { useExternalState } from '@utils/external-state';

import { mswModeActions, mswModeStore } from '@stores/config/mswModeStore';

import ButtonNext from '@common/ButtonNext';
import Text from '@common/Text';

import { displayNoneInMobile } from '@style/mediaQuery';

const MswControlButton = () => {
  const [isMswMode, setIsMswMode] = useExternalState(mswModeStore);

  const switchMswMode = async () => {
    if (isMswMode) {
      await mswModeActions.stopMsw();
    } else {
      await mswModeActions.startMsw();
    }

    setIsMswMode(!isMswMode);
  };

  return (
    <>
      <ButtonNext
        variant="text"
        color={isMswMode ? 'primary' : 'error'}
        css={displayNoneInMobile}
        onClick={() => switchMswMode()}
      >
        <Text align="center">MSW</Text>
        <Text align="center">{isMswMode ? 'ON' : 'OFF'}</Text>
      </ButtonNext>
    </>
  );
};

export default MswControlButton;
