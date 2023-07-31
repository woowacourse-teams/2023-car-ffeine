import { css } from 'styled-components';

import { useContext, type PropsWithChildren } from 'react';

import Button from '@common/Button';
import Text from '@common/Text';

import { ENGLISH_DAYS, ENGLISH_DAYS_TO_KOREAN_DAYS } from '@constants';

import { GraphContext } from '.';

import type { EnglishDaysType } from 'types';

const isEnglishDays = (day: string): day is EnglishDaysType => {
  return ENGLISH_DAYS.includes(day as EnglishDaysType);
};

const CircleDaySelectButton = ({ children }: PropsWithChildren) => {
  const { selectedDay, setSelectedDay } = useContext(GraphContext);

  const handleSelectDay = (day: string) => {
    if (isEnglishDays(day)) {
      setSelectedDay(day);
    }
  };

  return (
    <Button
      size="sm"
      outlined
      css={[buttonCss, selectedDay === children && colorCss]}
      background={selectedDay === children && '#0064ff'}
      onClick={() => {
        if (typeof children === 'string') {
          handleSelectDay(children);
        }
      }}
    >
      <Text variant="h6">
        {typeof children === 'string' &&
          isEnglishDays(children) &&
          `${ENGLISH_DAYS_TO_KOREAN_DAYS[children]}`}
      </Text>
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

export default CircleDaySelectButton;
