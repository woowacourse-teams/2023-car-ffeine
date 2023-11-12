import type { Meta } from '@storybook/react';
import styled from 'styled-components';

import StationSearchWindow from './StationSearchWindow';

const meta = {
  title: 'UI/StationSearchWindow',
  component: StationSearchWindow,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof StationSearchWindow>;

export default meta;

export const Default = () => {
  return <StationSearchWindow />;
};

const Container = styled.div`
  position: absolute;
  z-index: 9999;
`;
