import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { serverUrlStore } from '@stores/config/serverUrlStore';

import ServerStationFilters from '@ui/ServerStationFilters';

const queryClient = new QueryClient();

global.fetch = jest.fn();

describe('ServerStationFilters 컴포넌트 테스트', () => {
  it('ServerStationFilters 컴포넌트가 열리면 /fiters에 요청이 발생한다.', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ServerStationFilters />
      </QueryClientProvider>
    );

    const serverUrl = serverUrlStore.getState();

    expect(fetch).toHaveBeenCalledWith(`${serverUrl}/filters`);
  });
});
