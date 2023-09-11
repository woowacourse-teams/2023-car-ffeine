import { render, screen } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useServerStationFilters } from '@hooks/tanstack-query/station-filters/useServerStationFilters';

import type { StationFilters } from '@type';

import { CAPACITIES, COMPANIES, CONNECTOR_TYPES } from './../../../constants/chargers';
import ServerStationFilters from './ServerStationFilters';

const queryClient = new QueryClient();

jest.mock('@hooks/tanstack-query/station-filters/useServerStationFilters');

describe('ServerStationFilters 컴포넌트 테스트', () => {
  it('ServerStationFilters 컴포넌트가 열리면 useServerStationFilters 훅에서 받아온 정보를 화면에 렌더링 한다.', async () => {
    (useServerStationFilters as jest.Mock).mockReturnValue({
      data: {
        capacities: ['100.00', '200.00', '3.00'],
        companies: ['AM', 'BA', 'BG', 'BK'],
        connectorTypes: ['AC_3PHASE', 'AC_SLOW', 'DC_COMBO'],
      } as StationFilters,
      isLoading: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ServerStationFilters />
      </QueryClientProvider>
    );

    expect(screen.getByText(COMPANIES['AM'])).toBeInTheDocument();
    expect(screen.getByText(COMPANIES['BA'])).toBeInTheDocument();
    expect(screen.getByText(COMPANIES['BG'])).toBeInTheDocument();
    expect(screen.getByText(COMPANIES['BK'])).toBeInTheDocument();

    expect(screen.getByText(CAPACITIES[3])).toBeInTheDocument();
    expect(screen.getByText(CAPACITIES[0])).toBeInTheDocument();
    expect(screen.getByText(CAPACITIES[4])).toBeInTheDocument();

    expect(screen.getByText(CONNECTOR_TYPES['AC_3PHASE'])).toBeInTheDocument();
    expect(screen.getByText(CONNECTOR_TYPES['AC_SLOW'])).toBeInTheDocument();
    expect(screen.getByText(CONNECTOR_TYPES['DC_COMBO'])).toBeInTheDocument();
  });
});
