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
    <FlexBox justifyContent="between" alignItems="center" mb={2}>
      <Text fontSize={1.8} weight="bold">
        충전소 시간별 사용량
      </Text>
      <Button height={2.4} aria-label="사용량 그래프 설명 보기" onClick={handleOpenStatisticsHelp}>
        <InformationCircleIcon width={24} stroke="#747474" />
      </Button>
    </FlexBox>
  );
};

export default Title;
