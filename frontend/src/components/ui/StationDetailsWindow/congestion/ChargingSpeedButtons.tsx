import type { Dispatch, SetStateAction } from 'react';

import Button from '@common/Button';
import FlexBox from '@common/FlexBox';

import type { CHARGING_SPEED } from '@constants/chargers';

interface ChargingSpeedButtonsProps {
  chargingSpeed: keyof typeof CHARGING_SPEED;
  setChargingSpeed: Dispatch<SetStateAction<keyof typeof CHARGING_SPEED>>;
}

const ChargingSpeedButtons = ({ chargingSpeed, setChargingSpeed }: ChargingSpeedButtonsProps) => {
  return (
    <FlexBox nowrap mt={4} columnGap={2}>
      <Button
        variant={chargingSpeed === 'standard' ? 'contained' : 'outlined'}
        onClick={() => setChargingSpeed('standard')}
      >
        완속 충전기
      </Button>
      <Button
        variant={chargingSpeed === 'quick' ? 'contained' : 'outlined'}
        onClick={() => setChargingSpeed('quick')}
      >
        급속 충전기
      </Button>
    </FlexBox>
  );
};

export default ChargingSpeedButtons;
