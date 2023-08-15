import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import StationReportPreConfirmation from '@ui/StationDetailsWindow/reports/station/StationReportPreConfirmation';

import type { StationDetails } from '@type';

const queryClient = new QueryClient();

describe('StationReportPreConfirmation', () => {
  const mockStation: StationDetails = {
    address: '',
    chargers: [],
    companyName: '',
    contact: '',
    detailLocation: '',
    isParkingFree: false,
    isPrivate: false,
    latitude: 0,
    longitude: 0,
    operatingTime: '',
    privateReason: '',
    reportCount: 0,
    stationId: '',
    stationName: '',
    stationState: '',
  };

  it('오류 없이 렌더링이 잘 되는가?', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <StationReportPreConfirmation station={mockStation} />
      </QueryClientProvider>
    );
  });

  it('데이터의 수정 제안을 직접 할 때 모달이 잘 열리는가?', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <StationReportPreConfirmation station={mockStation} />
      </QueryClientProvider>
    );

    fireEvent.click(getByText('데이터를 직접 수정/제안하고 싶어요'));

    const modalContent = screen.getByText('개선할 충전소 정보가 있나요?');
    expect(modalContent).toBeInTheDocument();
  });
});
