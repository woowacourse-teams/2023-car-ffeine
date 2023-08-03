import { useExternalValue } from '@utils/external-state';

import { serverActions, serverStore } from '@stores/serverStore';

import ButtonNext from '@common/ButtonNext';

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
    >
      서버
      <br />
      {currentServer}
    </ButtonNext>
  );
};

export default DevelopmentServerControlButton;
