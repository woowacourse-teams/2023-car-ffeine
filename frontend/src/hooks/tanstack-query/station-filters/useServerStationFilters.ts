import { useQuery } from '@tanstack/react-query';

import { serverStore } from '@stores/config/serverStore';

import { SERVERS } from '@constants';
import type { CAPACITIES, CHARGER_TYPES, COMPANY_NAME } from '@constants/chargers';
import { SERVER_STATION_FILTERS_QUERY_KEY } from '@constants/queryKeys';

type CompanyNameKeys = keyof typeof COMPANY_NAME;
type ConnectorTypeKeys = keyof typeof CHARGER_TYPES;

interface ServerStationFilters {
  companyNames: { key: CompanyNameKeys; value: (typeof COMPANY_NAME)[CompanyNameKeys] }[];
  capacities: (typeof CAPACITIES)[number][];
  connectorTypes: { key: ConnectorTypeKeys; value: (typeof CHARGER_TYPES)[ConnectorTypeKeys] }[];
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
    queryKey: [SERVER_STATION_FILTERS_QUERY_KEY],
    queryFn: fetchServerStationFilters,
  });
};
