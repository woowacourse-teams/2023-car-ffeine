import { useQuery } from '@tanstack/react-query';

import { serverUrlStore } from '@stores/config/serverUrlStore';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { QUERY_KEY_SEARCHED_STATION } from '@constants/queryKeys';
import { SEARCH_SCOPE } from '@constants/stationSearch';

import type { SearchedStation } from '@type/stations';

interface SearchedStationResponse {
  stations: SearchedStation[];
}

export const fetchSearchedStations = async (searchWord: string) => {
  const serverUrl = serverUrlStore.getState();
  const searchedStations = await fetch(
    `${serverUrl}/stations/search?q=${searchWord}${SEARCH_SCOPE}`,
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

export const useSearchedStations = (searchWord: string) => {
  return useQuery({
    queryKey: [QUERY_KEY_SEARCHED_STATION, searchWord],
    queryFn: () => fetchSearchedStations(searchWord),
    enabled: !!searchWord,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
