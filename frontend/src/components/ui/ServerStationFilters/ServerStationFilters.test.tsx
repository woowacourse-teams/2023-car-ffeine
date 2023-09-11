import { fireEvent, render, screen } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  selectedCapacitiesFilterStore,
  selectedCompaniesFilterStore,
  selectedConnectorTypesFilterStore,
  serverStationFilterAction,
} from '@stores/station-filters/serverStationFiltersStore';

import { useServerStationFilters } from '@hooks/tanstack-query/station-filters/useServerStationFilters';

import type { StationFilters } from '@type';

import { CAPACITIES, COMPANIES, CONNECTOR_TYPES } from './../../../constants/chargers';
import ServerStationFilters from './ServerStationFilters';

const queryClient = new QueryClient();

jest.mock('@hooks/tanstack-query/station-filters/useServerStationFilters');

describe('ServerStationFilters 컴포넌트 테스트', () => {
  beforeEach(() => {
    serverStationFilterAction.deleteAllServerStationFilters();
  });

  it('ServerStationFilters 컴포넌트가 열리면 useServerStationFilters 훅에서 받아온 정보를 화면에 렌더링 한다.', () => {
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

  it('필터 옵션들을 선택하고 적용하기 버튼을 누르면 선택한 옵션들이 request param으로 추가되어 /stations에 요청이 발생한다.', () => {
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

    fireEvent.click(screen.getByText(COMPANIES['AM']));
    fireEvent.click(screen.getByText(COMPANIES['BA']));

    fireEvent.click(screen.getByText(CAPACITIES[0]));

    fireEvent.click(screen.getByText(CONNECTOR_TYPES['AC_3PHASE']));

    const selectedCapacities = selectedCapacitiesFilterStore.getState();
    const selectedCompanies = selectedCompaniesFilterStore.getState();
    const selectedConnectorTypes = selectedConnectorTypesFilterStore.getState();

    expect(selectedCompanies.has('AM')).toBeTruthy();
    expect(selectedCompanies.has('BA')).toBeTruthy();

    expect(selectedCapacities.has('3.00')).toBeTruthy();

    expect(selectedConnectorTypes.has('AC_3PHASE')).toBeTruthy();
  });

  it('필터 초기화 버튼을 클릭하면 차량 필터를 제외한 모든 필터 옵션들이 해제된다.', () => {
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

    fireEvent.click(screen.getByText(CAPACITIES[0]));

    fireEvent.click(screen.getByText(COMPANIES['AM']));
    fireEvent.click(screen.getByText(COMPANIES['BA']));

    fireEvent.click(screen.getByText(CONNECTOR_TYPES['AC_3PHASE']));

    // 유저가 클릭한 만큼 전역 상태에 추가되었는지 먼저 확인
    expect(selectedCapacitiesFilterStore.getState().size === 1).toBeTruthy();
    expect(selectedCompaniesFilterStore.getState().size === 2).toBeTruthy();
    expect(selectedConnectorTypesFilterStore.getState().size === 1).toBeTruthy();

    fireEvent.click(screen.getByLabelText('모든 필터 지우기 버튼'));

    // 모든 필터 지우기 버튼을 클릭했을시 전역 상태의 모든 필터 옵션이 지워졌는지 확인
    expect(selectedCapacitiesFilterStore.getState().size === 0).toBeTruthy();
    expect(selectedCompaniesFilterStore.getState().size === 0).toBeTruthy();
    expect(selectedConnectorTypesFilterStore.getState().size === 0).toBeTruthy();
  });
});
