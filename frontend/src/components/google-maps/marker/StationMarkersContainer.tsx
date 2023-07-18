import { useExternalValue } from '@utils/external-state';

import { getGoogleMapStore } from '@stores/googleMapStore';

import { useStations } from '@hooks/useStations';

import StationMarker from './StationMarker';

const StationMarkersContainer = () => {
  const googleMap = useExternalValue(getGoogleMapStore());
  const { data: stations, isSuccess } = useStations(googleMap);

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
