import { useQuery } from '@tanstack/react-query';

import { serverStore } from '@stores/config/serverStore';

import { SERVERS } from '@constants';
import { QUERY_KEY_SERVER_STATION_FILTERS } from '@constants/queryKeys';

import type { CapaCityBigDecimal, CompanyKey, ConnectorTypeKey } from '@type/serverStationFilter';

export interface ServerStationFilters {
  companies: CompanyKey[];
  capacities: CapaCityBigDecimal[];
  connectorTypes: ConnectorTypeKey[];
}

const fetchServerStationFilters = async () => {
  const mode = serverStore.getState();

  const serverStationFilters = await fetch(`${SERVERS[mode]}/filters`).then<ServerStationFilters>(
    (response) => response.json()
  );

  return serverStationFilters;
};

export const useServerStationFilters = () => {
  return useQuery({
    queryKey: [QUERY_KEY_SERVER_STATION_FILTERS],
    queryFn: fetchServerStationFilters,
  });
};
