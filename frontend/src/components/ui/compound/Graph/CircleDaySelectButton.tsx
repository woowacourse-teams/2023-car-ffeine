import { css } from 'styled-components';

import { type PropsWithChildren } from 'react';

import ButtonNext from '@common/ButtonNext';

import {
  SHORT_ENGLISH_DAYS_OF_WEEK,
  ENGLISH_DAYS_OF_WEEK_SHORT_TO_FULL,
  ENGLISH_DAYS_TO_KOREAN_DAYS,
  ENGLISH_DAYS_OF_WEEK_FULL_TO_SHORT,
} from '@constants/congestion';

import type { EnglishDaysOfWeek, ShortEnglishDaysOfWeek } from '@type/congestion';

interface DaySelectButtonProps extends PropsWithChildren {
  dayOfWeek: EnglishDaysOfWeek;
  onChangeDayOfWeek: (dayOfWeek: EnglishDaysOfWeek) => void;
}

const isEnglishDays = (day: string): day is ShortEnglishDaysOfWeek => {
  return SHORT_ENGLISH_DAYS_OF_WEEK.includes(day as ShortEnglishDaysOfWeek);
};

const CircleDaySelectButton = ({
  children,
  onChangeDayOfWeek,
  dayOfWeek,
}: DaySelectButtonProps) => {
  const handleSelectDay = (day: string) => {
    if (isEnglishDays(day)) {
      onChangeDayOfWeek(
        ENGLISH_DAYS_OF_WEEK_SHORT_TO_FULL[day as (typeof SHORT_ENGLISH_DAYS_OF_WEEK)[number]]
      );
    }
  };

  return (
    <ButtonNext
      size="sm"
      variant={
        ENGLISH_DAYS_OF_WEEK_FULL_TO_SHORT[dayOfWeek] === children ? 'contained' : 'outlined'
      }
      css={[buttonCss, ENGLISH_DAYS_OF_WEEK_FULL_TO_SHORT[dayOfWeek] === children && colorCss]}
      onClick={() => {
        if (typeof children === 'string') {
          handleSelectDay(children);
        }
      }}
    >
      {typeof children === 'string' &&
        isEnglishDays(children) &&
        `${ENGLISH_DAYS_TO_KOREAN_DAYS[children]}`}
    </ButtonNext>
  );
};

const buttonCss = css`
  width: 14.2%;
  max-width: 4rem;
  min-height: 4rem;
  padding: 0;

  border: 1px solid #d4d4d4;
  border-radius: 50%;
`;

const colorCss = css`
  color: #fff;
`;

export default CircleDaySelectButton;
