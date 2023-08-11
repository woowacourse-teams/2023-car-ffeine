import { useQuery } from '@tanstack/react-query';

import { serverStore } from '@stores/config/serverStore';

import { SERVERS } from '@constants';
import type { CAPACITIES, CHARGER_TYPES, COMPANY_NAME } from '@constants/chargers';
import { QUERY_KEY_SERVER_STATION_FILTERS } from '@constants/queryKeys';

type CompanyNameKeys = keyof typeof COMPANY_NAME;
type ConnectorTypeKeys = keyof typeof CHARGER_TYPES;

export interface ServerStationFilters {
  companies: CompanyNameKeys[];
  capacities: `${(typeof CAPACITIES)[number]}.00`[];
  connectorTypes: ConnectorTypeKeys[];
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
