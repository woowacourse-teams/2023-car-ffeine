import { stations } from '@mocks/data';
import { rest } from 'msw';

import { SERVERS } from '@constants';
import { COMPANIES } from '@constants/chargers';

import type { StationSummary } from '@type';
import type { CompanyKey } from '@type/serverStationFilter';

export const stationHandlers = [
  rest.get(`${SERVERS.localhost}/stations`, async (req, res, ctx) => {
    const { searchParams } = req.url;

    const latitude = Number(searchParams.get('latitude'));
    const longitude = Number(searchParams.get('longitude'));
    const latitudeDelta = Number(searchParams.get('latitudeDelta'));
    const longitudeDelta = Number(searchParams.get('longitudeDelta'));

    const isChargerTypeFilterSelected = searchParams.get('chargerTypes') !== null;
    const isCapacityFilterSelected = searchParams.get('capacities') !== null;
    const isCompanyNameFilterSelected = searchParams.get('companyNames') !== null;

    const selectedChargerTypes = searchParams.get('chargerTypes')?.split(',');
    const selectedCapacities = searchParams.get('capacities')?.split(',')?.map(Number);
    const selectedCompanies = searchParams.get('companyNames')?.split(',');

    console.log(selectedCompanies);

    const northEastBoundary = {
      latitude: latitude + latitudeDelta,
      longitude: longitude + longitudeDelta,
    };

    const southWestBoundary = {
      latitude: latitude - latitudeDelta,
      longitude: longitude - longitudeDelta,
    };

    const isStationLatitudeWithinBounds = (station: StationSummary) => {
      return (
        station.latitude > southWestBoundary.latitude &&
        station.latitude < northEastBoundary.latitude
      );
    };

    const isStationLongitudeWithinBounds = (station: StationSummary) => {
      return (
        station.longitude > southWestBoundary.longitude &&
        station.longitude < northEastBoundary.longitude
      );
    };

    const foundStations: StationSummary[] = stations
      .filter(
        (station) =>
          isStationLatitudeWithinBounds(station) && isStationLongitudeWithinBounds(station)
      )
      .filter((station) => {
        const isChargerTypeFilterInvalid =
          isChargerTypeFilterSelected &&
          !station.chargers.some((charger) => selectedChargerTypes.includes(charger.type));
        const isCapacityFilterInvalid =
          isCapacityFilterSelected &&
          !station.chargers.some((charger) => selectedCapacities.includes(charger.capacity));
        const isCompanyNameFilterInvalid =
          isCompanyNameFilterSelected &&
          !selectedCompanies
            .map((companyId) => COMPANIES[companyId as CompanyKey])
            .includes(station.companyName as (typeof COMPANIES)[CompanyKey]);

        if (isChargerTypeFilterInvalid || isCapacityFilterInvalid || isCompanyNameFilterInvalid) {
          return false;
        }
        return true;
      });

    console.log('찾은 충전소 갯수: ' + foundStations.length);

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        stations: foundStations,
      })
    );
  }),
];
