import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateStations = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(['stations'], {
    mutationFn: () => new Promise<Response>(() => new Response()),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['stations'] });
    },
  });

  const updateStations = () => {
    mutate();
  };

  return { updateStations };
};
