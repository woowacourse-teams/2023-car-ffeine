import { useQueryClient } from '@tanstack/react-query';

import { fetchStation } from './useStations';

export const useUpdateStations = () => {
  const queryClient = useQueryClient();

  const updateStations = async () => {
    await fetchStation();

    queryClient.invalidateQueries({ queryKey: ['stations'] });
  };

  return { updateStations };
};
