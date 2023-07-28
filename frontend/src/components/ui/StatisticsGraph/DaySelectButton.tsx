import { css } from 'styled-components';

import Button from '@common/Button';
import Text from '@common/Text';

import type { KoreanDaysType } from 'types';

interface Props {
  day: KoreanDaysType;
  isSelected: boolean;
  handleSetDay: (day: KoreanDaysType) => void;
}

const DaySelectButton = ({ day, isSelected, handleSetDay }: Props) => {
  return (
    <Button
      size="sm"
      outlined={true}
      css={isSelected ? [buttonCss, colorCss] : [buttonCss]}
      onClick={() => handleSetDay(day)}
      background={isSelected && '#0064ff'}
    >
      <Text variant="h6">{day}</Text>
    </Button>
  );
};

const buttonCss = css`
  width: 4rem;
  height: 4rem;

  border: 1px solid #d4d4d4;
  border-radius: 50%;
`;

const colorCss = css`
  color: #fff;
`;

export default DaySelectButton;
