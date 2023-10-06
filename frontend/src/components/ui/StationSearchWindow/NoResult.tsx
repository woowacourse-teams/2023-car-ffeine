import ListItem from '@common/ListItem';
import Text from '@common/Text';

import { noSearchResultCss } from '@ui/StationSearchWindow/SearchResult.style';

const NoResult = () => {
  return (
    <>
      <ListItem mt={3} css={noSearchResultCss} pb={0}>
        검색 결과가 없습니다.
      </ListItem>
      <ListItem mt={1} mb={5}>
        <Text variant="subtitle">검색어를 다시 한 번 확인해 주세요.</Text>
        <Text tag="span" css={{ display: 'block' }}>
          ·&nbsp; 오타는 없나요?
        </Text>
        <Text tag="span">·&nbsp; 띄어쓰기가 잘못되진 않았나요?</Text>
      </ListItem>
    </>
  );
};

export default NoResult;
