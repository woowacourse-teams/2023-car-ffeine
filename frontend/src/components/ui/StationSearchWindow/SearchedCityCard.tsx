import { MapPinIcon } from '@heroicons/react/24/solid';
import { css } from 'styled-components';

import { googleMapActions } from '@stores/google-maps/googleMapStore';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import ListItem from '@common/ListItem';
import Text from '@common/Text';

import type { SearchedCity } from '@type';

import { foundStationListCss } from './SearchResult.style';

export interface SearchedCityCardProps {
  city: SearchedCity;
}

const SearchedCityCard = ({ city }: SearchedCityCardProps) => {
  const { cityName, latitude, longitude } = city;

  return (
    <ListItem divider NoLastDivider css={foundStationListCss}>
      <Button
        width="100%"
        noRadius="all"
        background="transparent"
        onMouseDown={() => googleMapActions.moveTo({ lat: latitude, lng: longitude }, 14)}
      >
        <FlexBox alignItems="center" columnGap={2} nowrap css={iconCss}>
          <MapPinIcon width="1.6rem" fill="#888" />
          <Text
            title={cityName}
            align="left"
            lineClamp={1}
            fontSize={1.3}
            mb={0.25}
            color="#585858"
          >
            {cityName}
          </Text>
        </FlexBox>
      </Button>
    </ListItem>
  );
};

const iconCss = css`
  & > svg {
    flex-shrink: 0;
  }
`;

export default SearchedCityCard;
