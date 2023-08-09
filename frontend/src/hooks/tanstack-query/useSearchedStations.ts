import { useQuery } from '@tanstack/react-query';

import { useExternalValue } from '@utils/external-state';

import { serverStore } from '@stores/config/serverStore';
import { searchWordStore } from '@stores/searchWordStore';

import { SERVERS } from '@constants';
import { ERROR_MESSAGES } from '@constants/errorMessages';
import { SEARCHED_STATION_QUERY_KEY } from '@constants/queryKeys';
import { SEARCH_SCOPE } from '@constants/stationSearch';

import type { SearchedStation } from '@type/stations';

interface SearchedStationResponse {
  stations: SearchedStation[];
}

export const fetchSearchedStations = async (searchWord: string) => {
  const mode = serverStore.getState();
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
    queryKey: [SEARCHED_STATION_QUERY_KEY, searchWord],
    queryFn: () => fetchSearchedStations(searchWord),
    enabled: !!searchWord,
  });
};
