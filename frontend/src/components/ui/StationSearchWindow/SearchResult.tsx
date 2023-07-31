import { BoltIcon } from '@heroicons/react/24/solid';
import { css } from 'styled-components';

import { useSearchedStations } from '@hooks/useSearchedStations';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import List from '@common/List';
import ListItem from '@common/ListItem';
import Text from '@common/Text';

const SearchResult = () => {
  const { data, isLoading, isError } = useSearchedStations();

  if (isLoading || isError) return <></>;

  const { stations } = data;

  return (
    <List css={searchResultList}>
      {stations.map(({ stationId, stationName, address }) => (
        <ListItem key={stationId} css={foundStationList}>
          <Button width="100%" shadow css={foundStationButton}>
            <FlexBox alignItems="center" nowrap columnGap={2.8}>
              <FlexBox
                aria-disabled
                background="#e9edf8"
                justifyContent="center"
                alignItems="center"
                nowrap
                css={square}
              >
                <BoltIcon width={24} fill="#5c68d6" />
              </FlexBox>
              <article>
                <Text tag="h3" variant="h6" title={stationName} lineClamp={1}>
                  {stationName}
                </Text>
                <Text variant="label" align="left" lineClamp={1} color="#585858">
                  {address}
                </Text>
              </article>
            </FlexBox>
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

const searchResultList = css`
  max-height: calc(100vh - 18.6rem);
  border: 2rem solid #e9ecf5;
  border-radius: 1.2rem;
  background: #e9ecf5;
  overflow: auto;
`;

const square = css`
  padding: 0.4rem;
  border-radius: 1rem;
`;

const foundStationButton = css`
  padding: 1.2rem 1rem 1.4rem;
  box-shadow: 0 0.3rem 0.8rem 0 #ebebeb;
  border-radius: 1.2rem;
`;

const foundStationList = css`
  margin-bottom: 1.6rem;
  padding: 0;
  border-radius: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default SearchResult;
