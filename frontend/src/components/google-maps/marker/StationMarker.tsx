import { useEffect } from 'react';

import { useExternalValue, useSetExternalState } from '@utils/external-state';
import { getStoreSnapshot } from '@utils/external-state/tools';

import { getBriefStationInfoWindowStore } from '@stores/briefStationInfoWindowStore';
import { getGoogleMapStore } from '@stores/googleMapStore';
import { getMarkerClustererStore } from '@stores/markerClustererStore';
import { markerInstanceStore } from '@stores/markerInstanceStore';
import { selectedStationIdStore } from '@stores/selectedStationStore';

import { useUpdateStations } from '@hooks/useUpdateStations';

import BriefStationInfo from '@ui/BriefStationInfo';

import BlueMarker from '@assets/blue-marker.svg';

import type { StationSummary } from 'types';

interface Props {
  station: StationSummary;
}

const StationMarker = ({ station }: Props) => {
  const { latitude, longitude, stationName, stationId } = station;
  const googleMap = useExternalValue(getGoogleMapStore());
  const markerClusterer = useExternalValue(getMarkerClustererStore());

  const { updateStations } = useUpdateStations();
  const { briefStationInfoRoot, infoWindowInstance } = useExternalValue(
    getBriefStationInfoWindowStore()
  );

  const setMarkerInstanceState = useSetExternalState(markerInstanceStore);
  const setSelectedStationId = useSetExternalState(selectedStationIdStore);

  useEffect(() => {
    const markerInstance = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      // map: googleMap,
      title: stationName,
      icon: BlueMarker,
    });

    markerClusterer.addMarker(markerInstance);

    setMarkerInstanceState((previewsMarkerInstances) => [
      ...previewsMarkerInstances,
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

      setSelectedStationId(stationId);
      briefStationInfoRoot.render(<BriefStationInfo station={station} />);
      googleMap.panTo(markerInstance.getPosition());
      updateStations();
    });

    return () => {
      const selectedStationId = getStoreSnapshot(selectedStationIdStore);

      setMarkerInstanceState((prevMarkerInstances) =>
        prevMarkerInstances.filter((stationMarker) => stationMarker.stationId !== stationId)
      );

      if (selectedStationId === stationId) setSelectedStationId(null);

      markerInstance.setMap(null);
      markerClusterer.removeMarker(markerInstance);
    };
  }, []);

  return <></>;
};

export default StationMarker;
