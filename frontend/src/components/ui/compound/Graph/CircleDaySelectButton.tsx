import { ENGLISH_DAYS_OF_WEEK_LONG_TO_SHORT } from '@mocks/handlers/station-details/statisticsHandlers';
import { css } from 'styled-components';

import { type PropsWithChildren } from 'react';

import ButtonNext from '@common/ButtonNext';

import type { ENGLISH_DAYS_OF_WEEK_FULL_NAME } from '@constants/congestion';
import {
  ENGLISH_DAYS_OF_WEEK_SHORT_NAME,
  ENGLISH_DAYS_OF_WEEK_SHORT_TO_LONG,
  ENGLISH_DAYS_TO_KOREAN_DAYS,
} from '@constants/congestion';

import type { EnglishDaysType } from '@type/congestion';

interface DaySelectButtonProps extends PropsWithChildren {
  dayOfWeek: (typeof ENGLISH_DAYS_OF_WEEK_FULL_NAME)[number];
  onChangeDayOfWeek: (dayOfWeek: (typeof ENGLISH_DAYS_OF_WEEK_FULL_NAME)[number]) => void;
}

const isEnglishDays = (day: string): day is EnglishDaysType => {
  return ENGLISH_DAYS_OF_WEEK_SHORT_NAME.includes(day as EnglishDaysType);
};

const CircleDaySelectButton = ({
  children,
  onChangeDayOfWeek,
  dayOfWeek,
}: DaySelectButtonProps) => {
  const handleSelectDay = (day: string) => {
    if (isEnglishDays(day)) {
      onChangeDayOfWeek(
        ENGLISH_DAYS_OF_WEEK_SHORT_TO_LONG[day as (typeof ENGLISH_DAYS_OF_WEEK_SHORT_NAME)[number]]
      );
    }
  };

  console.log(dayOfWeek);
  ENGLISH_DAYS_OF_WEEK_LONG_TO_SHORT[dayOfWeek];

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
