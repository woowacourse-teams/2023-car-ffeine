import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useExternalValue } from '@utils/external-state';

import { searchWordStore } from '@stores/searchWordStore';

import { fetchSearchedStations } from './useSearchedStations';

export const useUpdateSearchResult = () => {
  const queryClient = useQueryClient();
  const searchWord = useExternalValue(searchWordStore);

  const { mutate } = useMutation(['searchedStations'], {
    mutationFn: () => fetchSearchedStations(searchWord),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['searchedStations'] });
    },
  });

  const updateSearchResult = () => {
    mutate();
  };

  return { updateSearchResult };
};
