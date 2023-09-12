import { ENGLISH_DAYS_OF_WEEK_LONG_TO_SHORT } from '@mocks/handlers/station-details/statisticsHandlers';
import { css } from 'styled-components';

import { type PropsWithChildren } from 'react';

import ButtonNext from '@common/ButtonNext';

import {
  SHORT_ENGLISH_DAYS_OF_WEEK,
  ENGLISH_DAYS_OF_WEEK_SHORT_TO_LONG,
  ENGLISH_DAYS_TO_KOREAN_DAYS,
} from '@constants/congestion';

import type { LongEnglishDaysOfWeek, ShortEnglishDaysOfWeek } from '@type/congestion';

interface DaySelectButtonProps extends PropsWithChildren {
  dayOfWeek: LongEnglishDaysOfWeek;
  onChangeDayOfWeek: (dayOfWeek: LongEnglishDaysOfWeek) => void;
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
        ENGLISH_DAYS_OF_WEEK_SHORT_TO_LONG[day as (typeof SHORT_ENGLISH_DAYS_OF_WEEK)[number]]
      );
    }
  };

  return (
    <ButtonNext
      size="sm"
      variant={
        ENGLISH_DAYS_OF_WEEK_LONG_TO_SHORT[dayOfWeek] === children ? 'contained' : 'outlined'
      }
      css={[buttonCss, ENGLISH_DAYS_OF_WEEK_LONG_TO_SHORT[dayOfWeek] === children && colorCss]}
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
