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
    <FlexBox nowrap columnGap={2}>
      <Button
        aria-label="완속 충전기 기준 시간별 사용량 보기"
        variant={chargingSpeed === 'standard' ? 'contained' : 'outlined'}
        onClick={() => setChargingSpeed('standard')}
      >
        완속 충전기
      </Button>
      <Button
        aria-label="급속 충전기 기준 시간별 사용량 보기"
        variant={chargingSpeed === 'quick' ? 'contained' : 'outlined'}
        onClick={() => setChargingSpeed('quick')}
      >
        급속 충전기
      </Button>
    </FlexBox>
  );
};

export default ChargingSpeedButtons;
