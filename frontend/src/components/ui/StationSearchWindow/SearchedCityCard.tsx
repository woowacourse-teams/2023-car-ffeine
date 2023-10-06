import { MapPinIcon } from '@heroicons/react/24/solid';

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
          <FlexBox justifyContent="between" alignItems="center">
            <FlexBox alignItems="center" gap={2}>
              <MapPinIcon width="1.6rem" fill="#888" />
              <Text title={cityName} fontSize={1.3} mb={0.25} color="4b4b4b">
                {cityName}
              </Text>
            </FlexBox>
            <Text variant="caption" color="#585858">
              이동하기
            </Text>
          </FlexBox>
        </Button>
      </FlexBox>
    </ListItem>
  );
};

export default SearchedCityCard;
