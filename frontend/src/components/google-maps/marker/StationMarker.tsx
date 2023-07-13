import { useEffect } from 'react';
import type { Root } from 'react-dom/client';

import BriefStationInfo from '../../ui/BriefStationInfo';
import { useUpdateStations } from '../../../hooks/useUpdateStations';
import type { Station } from '../../../types';
import { useExternalValue } from '../../../utils/external-state';
import { briefStationInfoWindowStore } from '../../../stores/briefStationInfoWindowStore';

interface Props {
  googleMap: google.maps.Map;
  station: Station;
}

const StationMarker = ({ googleMap, station }: Props) => {
  const { latitude, longitude, stationName } = station;

  const { updateStations } = useUpdateStations();
  const { briefStationInfoRoot, infoWindowInstance } = useExternalValue(
    briefStationInfoWindowStore
  );

  useEffect(() => {
    const markerInstance = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: googleMap,
      title: stationName,
    });

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
      markerInstance.setMap(null);
    };
  }, []);

  return <></>;
};

export default StationMarker;
