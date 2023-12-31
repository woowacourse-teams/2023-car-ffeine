import styled from 'styled-components';

import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import Nothing from '@assets/nothing.svg';

const EmptyStationsNotice = () => {
  return (
    <FlexBox width="100%" height="100%" nowrap direction="column" alignItems="center">
      <Image />
      <Text variant="h5" align="center" mt={-49} mb={4} color="#4b4b4b">
        주변에 충전소가 없습니다.
      </Text>
      <Text align="center" color="#4b4b4b">
        화면을 더 확대하거나 장소를 이동해 보세요.
      </Text>
    </FlexBox>
  );
};

const Image = styled(Nothing)`
  display: block;
  margin-top: -2rem;
  transform: scale(0.1);
`;

export default EmptyStationsNotice;
