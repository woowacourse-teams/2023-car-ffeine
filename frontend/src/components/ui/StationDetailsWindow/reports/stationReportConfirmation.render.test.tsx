import { render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import StationReportConfirmation from '@ui/StationDetailsWindow/reports/StationReportConfirmation';

const queryClient = new QueryClient();

it('hi', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <StationReportConfirmation
        station={{
          chargers: [],
          address: '',
          companyName: 'X Corp',
          contact: '',
          detailLocation: '우리집',
          isParkingFree: true,
          isPrivate: false,
          latitude: 1.23,
          longitude: 4.56,
          operatingTime: '매일매일',
          privateReason: '',
          reportCount: 1,
          stationId: 10,
          stationName: 'X 충전소',
          stationState: '운영중임?',
        }}
      />
    </QueryClientProvider>
  );
  expect(true).toBeTruthy();
});
