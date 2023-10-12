import type { Meta } from '@storybook/react';
import styled from 'styled-components';

import { stationListCss } from '../StationList';
import EmptyStationsNotice from './EmptyStationsNotice';

const meta = {
  title: 'UI/StationList/EmptyStationsNotice',
  component: EmptyStationsNotice,
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyStationsNotice>;

export default meta;

export const Default = () => {
  return (
    <Container>
      <EmptyStationsNotice />
    </Container>
  );
};

const Container = styled.div`
  ${stationListCss}
`;
