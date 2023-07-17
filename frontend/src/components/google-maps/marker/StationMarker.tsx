import { useEffect } from 'react';

import { useExternalValue, useSetExternalState } from '@utils/external-state';
import { getStoreSnapshot } from '@utils/external-state/tools';

import { getBriefStationInfoWindowStore } from '@stores/briefStationInfoWindowStore';
import { markerInstanceStore } from '@stores/markerInstanceStore';

import { useUpdateStations } from '@hooks/useUpdateStations';

import BriefStationInfo from '@ui/BriefStationInfo';

import type { Station } from 'types';

interface Props {
  googleMap: google.maps.Map;
  station: Station;
}

const StationMarker = ({ googleMap, station }: Props) => {
  const { latitude, longitude, stationName, stationId } = station;

  const { updateStations } = useUpdateStations();
  const { briefStationInfoRoot, infoWindowInstance } = useExternalValue(
    getBriefStationInfoWindowStore()
  );

  const setMarkerInstanceState = useSetExternalState(markerInstanceStore);

  useEffect(() => {
    const markerInstance = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: googleMap,
      title: stationName,
    });

    const prevMarkerInstances = getStoreSnapshot(markerInstanceStore);
    setMarkerInstanceState([
      ...prevMarkerInstances,
      {
        stationId,
        markerInstance,
      },
    ]);

    markerInstance.addListener('click', () => {
      infoWindowInstance.open({
        anchor: markerInstance,
        map: googleMap,
      });

      briefStationInfoRoot.render(<BriefStationInfo station={station} />);
      googleMap.panTo(markerInstance.getPosition());
      updateStations(googleMap);
    });

    return () => {
      const prevMarkerInstances = getStoreSnapshot(markerInstanceStore);
      setMarkerInstanceState(
        prevMarkerInstances.filter((stationMarker) => stationMarker.stationId !== stationId)
      );

      markerInstance.setMap(null);
    };
  }, []);

  return <></>;
};

export default StationMarker;
