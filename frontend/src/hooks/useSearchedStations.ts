import { useQuery } from '@tanstack/react-query';

import { useExternalValue } from '@utils/external-state';

import { developmentServerStore } from '@stores/developmentServerStore';
import { searchWordStore } from '@stores/searchWordStore';

import { ERROR_MESSAGES, SEARCH_SCOPE, SERVERS } from '@constants';

import type { SearchedStation, SearchedStationResponse } from 'types';

export const fetchSearchedStations = async (searchWord: string) => {
  const mode = developmentServerStore.getState();
  const searchedStations = await fetch(
    `${SERVERS[mode]}/stations/search?q=${searchWord}${SEARCH_SCOPE}`,
    {
      method: 'GET',
    }
  ).then<SearchedStation[]>(async (response) => {
    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.NO_SEARCH_RESULT);
    }

    const data: SearchedStationResponse = await response.json();

    return data.stations;
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
