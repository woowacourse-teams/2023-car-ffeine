import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchStation } from './useStations';

export const useUpdateStations = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(['stations'], {
    mutationFn: fetchStation,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['stations'] });
    },
  });

  const updateStations = (googleMap: google.maps.Map) => {
    mutate(googleMap);
  };

  return { updateStations };
};
