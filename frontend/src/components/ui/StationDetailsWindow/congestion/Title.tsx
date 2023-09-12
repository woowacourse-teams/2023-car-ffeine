import { InformationCircleIcon } from '@heroicons/react/24/outline';

import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

const Title = () => {
  return (
    <FlexBox justifyContent="between" alignItems="center" mb={3}>
      <Text fontSize={1.8} weight="bold">
        충전소 시간별 혼잡도
      </Text>
      <Text>
        <InformationCircleIcon width={24} stroke="#747474" />
      </Text>
    </FlexBox>
  );
};

export default Title;
