import { useExternalValue } from '@utils/external-state';

import { serverActions, serverStore } from '@stores/serverStore';

import Button from '@common/Button';
import Text from '@common/Text';

import type { SERVERS } from '@constants';

const DevelopmentServerSelect = () => {
  const currentServer = useExternalValue(serverStore);
  const changeServer = (nextServer: keyof typeof SERVERS) => {
    serverActions.changeServer(nextServer);
  };

  return (
    <>
      <Text>{currentServer}</Text>
      <Button outlined size="sm" onClick={() => changeServer('localhost')}>
        <Text>localhost</Text>
      </Button>
      <Button outlined size="sm" onClick={() => changeServer('dain')}>
        <Text>dain</Text>
      </Button>
    </>
  );
};

export default DevelopmentServerSelect;
