import type { Meta } from '@storybook/react';
import styled from 'styled-components';

import type { SummaryButtonsProps } from './SummaryButtons';
import SummaryButtons from './SummaryButtons';

const meta = {
  title: 'UI/StationInfoWindow/Buttons',
  component: SummaryButtons,
  args: {
    handleCloseStationSummary: () => {
      alert('충전소 간단 정보창이 닫혔습니다.');
    },
    handleOpenStationDetail: () => {
      alert('충전소 상세 정보창이 열렸습니다.');
    },
  },
  argTypes: {
    handleCloseStationSummary: {
      description: '충전소 간단 정보창을 닫을 수 있습니다.',
    },
    handleOpenStationDetail: {
      description: '충전소 상세 정보창을 열 수 있습니다. 모바일에서만 보이는 버튼입니다.',
    },
  },
} satisfies Meta<typeof SummaryButtons>;

export default meta;

export const Default = (args: SummaryButtonsProps) => {
  return (
    <Container>
      <SummaryButtons {...args} />
    </Container>
  );
};

const Container = styled.div`
  width: 32rem;
`;
