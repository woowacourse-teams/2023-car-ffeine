import { MapPinIcon } from '@heroicons/react/24/outline';

import { googleMapActions } from '@stores/google-maps/googleMapStore';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';
import ListItem from '@common/ListItem';
import Text from '@common/Text';

import type { SearchedCity } from '@type';

export interface SearchedCityCardProps {
  city: SearchedCity;
}

const SearchedCityCard = ({ city }: SearchedCityCardProps) => {
  const { cityName, latitude, longitude } = city;

  return (
    <ListItem divider>
      <FlexBox alignItems="center">
        <Button
          width="100%"
          noRadius="all"
          background="transparent"
          onMouseDown={() => googleMapActions.moveTo({ lat: latitude, lng: longitude }, 14)}
        >
          <FlexBox alignItems="center" gap={2}>
            <MapPinIcon width="1.6rem" stroke="#767676" />
            <Text title={cityName} mb={0.5} lineClamp={1}>
              {cityName}
            </Text>
          </FlexBox>
        </Button>
      </FlexBox>
    </ListItem>
  );
};

export default SearchedCityCard;
