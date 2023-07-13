import { useEffect } from 'react';
import type { Root } from 'react-dom/client';

import BriefStationInfo from '../../BriefStationInfo';
import { useUpdateStations } from '../../../hooks/useUpdateStations';
import type { Station } from '../../../types';

interface Props {
  googleMap: google.maps.Map;
  station: Station;
  briefStationInfoRoot: Root;
  infoWindow: google.maps.InfoWindow;
}

const StationMarker = ({ googleMap, station, briefStationInfoRoot, infoWindow }: Props) => {
  const { latitude, longitude, stationName } = station;

  const { updateStations } = useUpdateStations();

  useEffect(() => {
    const markerInstance = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: googleMap,
      title: stationName,
    });

    markerInstance.addListener('click', () => {
      infoWindow.open({
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
