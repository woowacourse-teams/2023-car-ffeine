import type { Meta } from '@storybook/react';
import { styled } from 'styled-components';

import StationSearchBar from './StationSearchBar';

const meta = {
  title: 'UI/StationSearchBar',
  decorators: [
    (Story) => (
      <S.Container>
        <Story />
      </S.Container>
    ),
  ],
} satisfies Meta;

export default meta;

export const Default = () => {
  return <StationSearchBar />;
};

const S = {
  Container: styled.div`
    position: fixed;
    top: 24px;
    left: 8rem;
    z-index: 9999;
  `,
};
