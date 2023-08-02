import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchStation } from './useStations';

export const useUpdateStations = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(['stations'], {
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['stations'] });
    },
  });

  const updateStations = () => {
    mutate();
  };

  return { updateStations };
};
