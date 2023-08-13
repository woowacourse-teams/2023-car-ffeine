import Box from '@common/Box';
import List from '@common/List';
import ListItem from '@common/ListItem';
import Skeleton from '@common/Skeleton';

import { foundStationList, searchResultList } from '@ui/StationSearchWindow/SearchResult';

const SearchResultSkeleton = () => {
  return (
    <List css={searchResultList}>
      {Array.from({ length: 10 }, (_, index) => (
        <ListItem divider NoLastDivider key={index} css={foundStationList}>
          <Box p={2}>
            <Skeleton width="12rem" height="1.2rem" mb={2} />
            <Skeleton width="24rem" />
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default SearchResultSkeleton;
