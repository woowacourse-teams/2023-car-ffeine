import { InformationCircleIcon } from '@heroicons/react/24/outline';

import { modalActions } from '@stores/layout/modalStore';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import Help from './Help';

const Title = () => {
  const handleOpenStatisticsHelp = () => {
    modalActions.openModal(<Help />);
  };

  return (
    <FlexBox justifyContent="between" alignItems="center" mb={3}>
      <Text fontSize={1.8} weight="bold">
        충전소 시간별 혼잡도
      </Text>
      <Button>
        <InformationCircleIcon width={24} stroke="#747474" onClick={handleOpenStatisticsHelp} />
      </Button>
    </FlexBox>
  );
};

export default Title;
