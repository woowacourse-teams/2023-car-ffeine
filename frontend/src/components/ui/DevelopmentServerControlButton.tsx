import { useExternalValue } from '@utils/external-state';

import { serverActions, serverStore } from '@stores/serverStore';

import Button from '@common/Button';
import ButtonNext from '@common/ButtonNext';
import Text from '@common/Text';

const DevelopmentServerControlButton = () => {
  const currentServer = useExternalValue(serverStore);

  const handleClickDevelopmentServerControlButton = () => {
    serverActions.changeServer(currentServer === 'localhost' ? 'dain' : 'localhost');
  };

  return (
    <ButtonNext
      variant="text"
      color="dark"
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
