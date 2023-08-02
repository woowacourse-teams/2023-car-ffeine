import { useExternalValue } from '@utils/external-state';

import { developmentServerActions, developmentServerStore } from '@stores/developmentServerStore';

import Button from '@common/Button';
import Text from '@common/Text';

const DevelopmentServerControlButton = () => {
  const currentServer = useExternalValue(developmentServerStore);

  const handleClickDevelopmentServerControlButton = () => {
    developmentServerActions.changeServer(currentServer === 'localhost' ? 'dain' : 'localhost');
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
