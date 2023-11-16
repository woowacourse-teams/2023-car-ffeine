import { useQuery } from '@tanstack/react-query';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { QUERY_KEY_SEARCHED_STATION } from '@constants/queryKeys';
import { SERVER_URL } from '@constants/server';
import { SEARCH_SCOPE } from '@constants/stationSearch';

import type { SearchedCity, SearchedStation } from '@type/stations';

export interface SearchedStationResponse {
  stations: SearchedStation[];
  cities: SearchedCity[];
}

export const fetchSearchedStations = async (searchWord: string) => {
  const searchedStations = await fetch(
    `${SERVER_URL}/stations/search?q=${searchWord}${SEARCH_SCOPE}`
  ).then<SearchedStationResponse>(async (response) => {
    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.NO_SEARCH_RESULT);
    }

    const data: SearchedStationResponse = await response.json();

    return data;
  });

  return searchedStations;
};

export const useSearchStations = (searchWord: string) => {
  return useQuery({
    queryKey: [QUERY_KEY_SEARCHED_STATION, searchWord],
    queryFn: () => fetchSearchedStations(searchWord),
    enabled: !!searchWord,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
