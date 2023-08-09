import { useQueryClient } from '@tanstack/react-query';

import { STATIONS_QUERY_KEY } from '@constants/queryKeys';

import { fetchStation } from './useStations';

export const useUpdateStations = () => {
  const queryClient = useQueryClient();

  const updateStations = async () => {
    await fetchStation();

    queryClient.invalidateQueries({ queryKey: [STATIONS_QUERY_KEY] });
  };

  return { updateStations };
};
