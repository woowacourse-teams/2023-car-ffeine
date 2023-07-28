import { useExternalValue } from '@utils/external-state';

import FlexBox from '@common/FlexBox';

import type { GraphProps } from '.';
import { selectedDayStore } from './GraphStore';

interface BarContainerProps extends GraphProps {
  renderBar: (hour: number, ratio: number) => JSX.Element;
}

const BarContainer = ({ align, statistics, renderBar }: BarContainerProps) => {
  const selectedDay = useExternalValue(selectedDayStore);

  return (
    <FlexBox direction={align}>
      {statistics[selectedDay].map(({ hour, ratio }) => renderBar(hour, ratio))}
    </FlexBox>
  );
};

export default BarContainer;
