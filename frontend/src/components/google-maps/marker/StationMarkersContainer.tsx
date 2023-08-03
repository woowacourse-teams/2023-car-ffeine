import { useEffect } from 'react';

import { useExternalValue } from '@utils/external-state';

import { getGoogleMapStore } from '@stores/googleMapStore';

import { useStations } from '@hooks/useStations';

import StationMarker from './StationMarker';

const StationMarkersContainer = () => {
  const { data: stations, isSuccess } = useStations();

  // const googleMap = useExternalValue(getGoogleMapStore());
  // useEffect(() => {
  //   const marker = new google.maps.marker.AdvancedMarkerElement({
  //     map: googleMap,
  //     position: { lat: 37.4239163, lng: 127.0947209 },
  //   });
  // }, []);

  if (!stations || !isSuccess) {
    return <></>;
  }

  return (
    <>
      {stations.map((station) => {
        return <StationMarker key={station.stationId} station={station} />;
      })}
    </>
  );
};

export default StationMarkersContainer;
