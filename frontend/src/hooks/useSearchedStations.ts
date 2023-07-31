import { useQuery } from '@tanstack/react-query';

import { useExternalValue } from '@utils/external-state';

import { searchWordStore } from '@stores/searchWordStore';

import { DEVELOP_URL, ERROR_MESSAGES, SEARCH_SCOPE } from '@constants';

import type { SearchedStations } from 'types';

export const fetchSearchedStations = async (searchWord: string) => {
  const searchedStations = await fetch(
    `${DEVELOP_URL}/stations/search?q=${searchWord}${SEARCH_SCOPE}`,
    {
      method: 'GET',
    }
  ).then<SearchedStations>(async (response) => {
    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.NO_SEARCH_RESULT);
    }

    const data: SearchedStations = await response.json();

    return data;
  });

  return searchedStations;
};

export const useSearchedStations = () => {
  const searchWord = useExternalValue(searchWordStore);

  return useQuery({
    queryKey: ['searchedStations'],
    queryFn: () => fetchSearchedStations(searchWord),
    enabled: !!searchWord,
  });
};
