import { useExternalValue } from '@utils/external-state';

import { serverActions, serverStore } from '@stores/serverStore';

import Button from '@common/Button';
import Text from '@common/Text';

const DevelopmentServerControlButton = () => {
  const currentServer = useExternalValue(serverStore);

  const handleClickDevelopmentServerControlButton = () => {
    serverActions.changeServer(currentServer === 'localhost' ? 'dain' : 'localhost');
  };

  return (
    <Button onClick={handleClickDevelopmentServerControlButton}>
      <>
        <Text align="center">현재서버</Text>
        <Text align="center" variant="caption">
          {currentServer}
        </Text>
      </>
    </Button>
  );
};

export default DevelopmentServerControlButton;
