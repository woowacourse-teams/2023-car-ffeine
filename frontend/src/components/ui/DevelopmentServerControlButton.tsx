import { useExternalValue } from '@utils/external-state';

import { serverActions, serverStore } from '@stores/config/serverStore';

import ButtonNext from '@common/ButtonNext';

import { displayNoneInMobile } from '@style/mediaQuery';

const DevelopmentServerControlButton = () => {
  const currentServer = useExternalValue(serverStore);

  const handleClickDevelopmentServerControlButton = () => {
    serverActions.changeServer(currentServer === 'localhost' ? 'dain' : 'localhost');
  };

  return (
    <ButtonNext
      variant="text"
      color={currentServer === 'localhost' ? 'secondary' : 'success'}
      size="xs"
      onClick={handleClickDevelopmentServerControlButton}
      css={displayNoneInMobile}
    >
      서버
      <br />
      {currentServer}
    </ButtonNext>
  );
};

export default DevelopmentServerControlButton;
