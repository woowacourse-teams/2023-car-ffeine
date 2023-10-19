import { BiSolidCar } from 'react-icons/bi';

import FlexBox from '@common/FlexBox';
import type { FlexBoxProps } from '@common/FlexBox/FlexBox';
import Text from '@common/Text';

import type { Station } from '@type';

interface PathFindingProps
  extends Pick<Station, 'address' | 'latitude' | 'longitude'>,
    FlexBoxProps {}

const PathFinding = ({ address, latitude, longitude, ...props }: PathFindingProps) => {
  const KAKAO_MAP_LINK = `https://map.kakao.com/link/to/${address},${latitude},${longitude}`;

  return (
    <FlexBox
      tag="a"
      alignItems="center"
      rel="noreferrer"
      href={KAKAO_MAP_LINK}
      target="_blank"
      {...props}
    >
      <Text variant="label" weight='regular'>길찾기</Text>
      <BiSolidCar />
    </FlexBox>
  );
};

export default PathFinding;
