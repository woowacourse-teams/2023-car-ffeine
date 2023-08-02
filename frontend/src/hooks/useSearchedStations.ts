import { useQuery } from '@tanstack/react-query';

import { useExternalValue } from '@utils/external-state';

import { searchWordStore } from '@stores/searchWordStore';

import { DEVELOP_URL, ERROR_MESSAGES, SEARCH_SCOPE } from '@constants';

import type { SearchedStation } from 'types';

export const fetchSearchedStations = async (searchWord: string) => {
  const searchedStations = await fetch(
    `${DEVELOP_URL}/stations/search?q=${searchWord}${SEARCH_SCOPE}`,
    {
      method: 'GET',
    }
  ).then<SearchedStation[]>(async (response) => {
    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.NO_SEARCH_RESULT);
    }

    const data: SearchedStation[] = await response.json();

    return data;
  });

  return searchedStations;
};

export const useSearchedStations = () => {
  const searchWord = useExternalValue(searchWordStore);

  return useQuery({
    queryKey: ['searchedStations', searchWord],
    queryFn: () => fetchSearchedStations(searchWord),
    enabled: !!searchWord,
  });
};
