import { modalActions } from '@stores/modalStore';

import Button from '@common/Button';
import Text from '@common/Text';

import DevelopmentServerSelect from '@ui/DevelopmentServerSelect';

const DevelopmentServerControlButton = () => {
  const handleDevelopmentServerControlButton = () => {
    modalActions.openModal(<DevelopmentServerSelect />);
  };

  return (
    <Button onClick={handleDevelopmentServerControlButton}>
      <>
        <Text align="center">하이</Text>
      </>
    </Button>
  );
};

export default DevelopmentServerControlButton;
