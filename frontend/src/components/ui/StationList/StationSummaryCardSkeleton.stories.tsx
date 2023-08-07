import type { Meta } from '@storybook/react';
import { css } from 'styled-components';

import List from '@common/List';

import StationSummaryCardSkeleton from '@ui/StationList/StationSummaryCardSkeleton';

const meta = {
  title: 'UI/StationSummaryCardSkeleton',
  component: StationSummaryCardSkeleton,
} satisfies Meta<typeof StationSummaryCardSkeleton>;

export default meta;

export const Default = () => {
  return (
    <List css={listCss}>
      <StationSummaryCardSkeleton />
    </List>
  );
};

const listCss = css`
  left: 7rem;
  bottom: 0;
  width: 34rem;
  border-top: 1.8rem solid var(--lighter-color);
  border-bottom: 4rem solid var(--lighter-color);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background: var(--lighter-color);
  overflow: auto;
`;
