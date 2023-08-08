import Box from '@common/Box';
import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

const EmptyStationsNotice = () => {
  return (
    <FlexBox width="100%" height="100%" justifyContent="center" alignItems="center">
      <Box>
        <Text align="center" css={{ fontSize: '20rem', fontWeight: 'bold' }} mb={7}>
          텅
        </Text>
        <Text align="center">조회 가능한 충전소가 없습니다.</Text>
        <Text align="center">화면을 조금 더 확대하거나 장소를 이동해보세요.</Text>
      </Box>
    </FlexBox>
  );
};

export default EmptyStationsNotice;
