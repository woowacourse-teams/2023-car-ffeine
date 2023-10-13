import { rest } from 'msw';

import { DEVELOP_SERVER_URL } from '@constants/server';

export const clusteringHandler = [
  rest.get(`${DEVELOP_SERVER_URL}/clustering`, (req, res, ctx) => {
    const { searchParams } = req.url;

    const latitude = Number(searchParams.get('latitude'));
    const longitude = Number(searchParams.get('longitude'));
    const latitudeDelta = Number(searchParams.get('latitudeDelta'));
    const longitudeDelta = Number(searchParams.get('longitudeDelta'));
    const latitudeDivisionSize = Number(searchParams.get('latitudeDivisionSize'));
    const longitudeDivisionSize = Number(searchParams.get('longitudeDivisionSize'));

    const latitudeDivisionDelta = (latitudeDelta * 2) / latitudeDivisionSize;
    const longitudeDivisionDelta = (longitudeDelta * 2) / longitudeDivisionSize;

    const minLatitude = latitude - latitudeDelta + latitudeDivisionDelta / 2;
    const minLongitude = longitude - longitudeDelta + longitudeDivisionDelta / 2;

    const mockCluster = [];

    for (let i = 0; i < latitudeDivisionSize; i++) {
      for (let j = 0; j < longitudeDivisionSize; j++) {
        const cluster = {
          id: Math.random(),
          latitude: minLatitude + latitudeDivisionDelta * i,
          longitude: minLongitude + longitudeDivisionDelta * j,
          count: Math.floor(Math.random() * 10),
        };

        mockCluster.push(cluster);
      }
    }

    return res(ctx.json(mockCluster), ctx.status(200));
  }),
];
