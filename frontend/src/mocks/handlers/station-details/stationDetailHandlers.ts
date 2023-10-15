import { getStations } from '@mocks/data/stations';
import { rest } from 'msw';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { DEVELOP_SERVER_URL } from '@constants/server';

export const stationDetailHandlers = [
  rest.get(`${DEVELOP_SERVER_URL}/stations/:id`, async (req, res, ctx) => {
    const stations = await getStations();
    const stationId = req.params.id;
    const selectedStation = stations.find((station) => station.stationId === stationId);

    if (!selectedStation) {
      return res(ctx.status(404), ctx.json({ message: ERROR_MESSAGES.NO_STATION_FOUND }));
    }

    return res(ctx.delay(200), ctx.status(200), ctx.json(selectedStation));
  }),
];
