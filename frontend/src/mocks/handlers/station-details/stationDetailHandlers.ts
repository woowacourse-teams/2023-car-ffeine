import { stations } from '@mocks/data';
import { rest } from 'msw';

import { SERVERS } from '@constants';
import { ERROR_MESSAGES } from '@constants/errorMessages';

export const stationDetailHandlers = [
  rest.get(`${SERVERS.localhost}/stations/:id`, async (req, res, ctx) => {
    const stationId = req.params.id;
    const selectedStation = stations.find((station) => station.stationId === stationId);

    if (!selectedStation) {
      return res(ctx.status(404), ctx.json({ message: ERROR_MESSAGES.NO_STATION_FOUND }));
    }

    return res(ctx.delay(200), ctx.status(200), ctx.json(selectedStation));
  }),
];
