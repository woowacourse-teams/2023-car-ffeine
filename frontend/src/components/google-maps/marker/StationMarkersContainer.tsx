import React from 'react';

import { useInfiniteStationSummary } from '@hooks/tanstack-query/station-markers/useInfiniteStationSummary';

import StationMarker from './StationMarker';

const StationMarkersContainer = () => {
  const { status, data } = useInfiniteStationSummary();

  if (status === 'loading' || status === 'error') {
    return <></>;
  }
  const stations = data.pages.map((page) => page.stations).flatMap((foo) => foo);

  return (
    <>
      {stations.map((station, index) => (
        <StationMarker key={station.stationId + index} station={station} />
      ))}
    </>
  );
};

export default StationMarkersContainer;
