import { getSearchedStations, stations } from '@mocks/data';
import { rest } from 'msw';

import { SERVERS } from '@constants';
import { ERROR_MESSAGES } from '@constants/errorMessages';

export const stationSearchHandlers = [
  rest.get(`${SERVERS.localhost}/stations/search`, async (req, res, ctx) => {
    const searchWord = req.url.searchParams.get('q');

    if (!stations.length) {
      return res(ctx.status(404), ctx.json({ message: ERROR_MESSAGES.NO_SEARCH_RESULT }));
    }

    const searchResult = {
      stations: getSearchedStations(searchWord),
    };

    return res(ctx.delay(200), ctx.status(200), ctx.json(searchResult));
  }),
];
