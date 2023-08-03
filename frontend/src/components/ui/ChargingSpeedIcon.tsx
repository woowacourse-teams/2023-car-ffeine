import { BoltIcon } from '@heroicons/react/24/solid';
import { css } from 'styled-components';

import FlexBox from '@common/FlexBox';

const ChargingSpeedIcon = () => {
  return (
    <FlexBox
      aria-label="급속 충전기가 있는 충전소"
      background="#e9edf8"
      justifyContent="center"
      alignItems="center"
      nowrap
      css={square}
    >
      <BoltIcon width={24} fill="#5c68d6" />
    </FlexBox>
  );
};

const square = css`
  padding: 0.4rem;
  border-radius: 1rem;
`;

export default ChargingSpeedIcon;
