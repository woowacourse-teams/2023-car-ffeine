import { useEffect } from 'react';
import type { Root } from 'react-dom/client';
import type { Station } from '../../../types';
import BriefStationInfo from '../../BriefStationInfo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchStation } from '../../../hooks/useStations';

interface Props {
  googleMap: google.maps.Map;
  station: Station;
  briefStationInfoRoot: Root;
  infoWindow: google.maps.InfoWindow;
}

const StationMarker = ({ googleMap, station, briefStationInfoRoot, infoWindow }: Props) => {
  const { latitude, longitude, stationName } = station;

  const queryClient = useQueryClient();

  const { mutate } = useMutation(['stations'], {
    mutationFn: fetchStation,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['stations'] });
    },
  }); // TODO: 다른 곳에서도 코드 그대로 사용 중이므로 모듈화 필요

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
      mutate(googleMap);
    });

    return () => {
      markerInstance.setMap(null);
    };
  }, []);

  return <></>;
};

export default StationMarker;
