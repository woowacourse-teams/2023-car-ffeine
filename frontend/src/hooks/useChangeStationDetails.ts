import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchStationDetails } from './useSelectedStation';

export const useChangeStationDetails = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(['stationDetails'], {
    mutationFn: fetchStationDetails,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['stationDetails'] });
    },
  });

  const changeStationDetails = (stationId: number) => {
    mutate(stationId);
  };

  return { changeStationDetails };
};
