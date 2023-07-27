import Button from '@common/Button';

import type { DayKorean } from 'types';

interface Props {
  day: DayKorean;
}

const DaySelectButton = ({ day }: Props) => {
  return (
    <Button size="sm" outlined={true}>
      {day}
    </Button>
  );
};

export default DaySelectButton;
