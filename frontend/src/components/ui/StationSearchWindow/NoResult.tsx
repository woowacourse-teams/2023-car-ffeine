import ListItem from '@common/ListItem';
import Text from '@common/Text';

const NoResult = () => {
  return (
    <ListItem>
      <Text mt={3} fontSize={1.8} weight="bold">
        검색 결과가 없습니다.
      </Text>
      <Text variant="subtitle" mt={1}>
        검색어를 다시 한 번 확인해 주세요.
      </Text>
      <Text>·&nbsp; 오타는 없나요?</Text>
      <Text mb={5}>·&nbsp; 띄어쓰기가 잘못되진 않았나요?</Text>
    </ListItem>
  );
};

export default NoResult;
