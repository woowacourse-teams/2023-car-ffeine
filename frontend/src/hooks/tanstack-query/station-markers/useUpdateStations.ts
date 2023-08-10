import { useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY_STATIONS } from '@constants/queryKeys';

import { fetchStation } from './useStations';

export const useUpdateStations = () => {
  const queryClient = useQueryClient();

  const updateStations = async () => {
    await fetchStation();

    queryClient.invalidateQueries({ queryKey: [QUERY_KEY_STATIONS] });
  };

  return { updateStations };
};
