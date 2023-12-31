import { getCities, getSearchedStations } from '@mocks/data/search';
import { getStations } from '@mocks/data/stations';
import { rest } from 'msw';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { DEVELOP_SERVER_URL } from '@constants/server';

export const stationSearchHandlers = [
  rest.get(`${DEVELOP_SERVER_URL}/stations/search`, async (req, res, ctx) => {
    const stations = await getStations();
    const searchWord = req.url.searchParams.get('q');

    if (!stations.length) {
      return res(ctx.status(404), ctx.json({ message: ERROR_MESSAGES.NO_SEARCH_RESULT }));
    }

    const searchResult = {
      cities: getCities()
        .filter((city) => city.cityName.includes(searchWord))
        .slice(0, 3),
      stations: await getSearchedStations(stations, searchWord),
    };

    return res(ctx.delay(200), ctx.status(200), ctx.json(searchResult));
  }),
];
