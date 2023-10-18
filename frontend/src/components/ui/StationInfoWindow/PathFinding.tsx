import { BiSolidCar } from 'react-icons/bi';

import FlexBox from '@common/FlexBox';
import Text from '@common/Text';

import type { Station } from '@type';

type PathFindingProps = Pick<Station, 'address' | 'latitude' | 'longitude'>;

const PathFinding = ({ address, latitude, longitude }: PathFindingProps) => {
  const KAKAO_MAP_LINK = `https://map.kakao.com/link/to/${address},${latitude},${longitude}`;

  return (
    <FlexBox tag="a" alignItems="center" rel="noreferrer" href={KAKAO_MAP_LINK} target="_blank">
      <Text variant="label">길찾기</Text>
      <BiSolidCar />
    </FlexBox>
  );
};

export default PathFinding;
