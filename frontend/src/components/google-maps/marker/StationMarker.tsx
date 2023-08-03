import { createElement, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { useQueryClient } from '@tanstack/react-query';

import { useExternalValue, useSetExternalState } from '@utils/external-state';
import { getStoreSnapshot } from '@utils/external-state/tools';

import { getBriefStationInfoWindowStore } from '@stores/briefStationInfoWindowStore';
import { getGoogleMapStore } from '@stores/googleMapStore';
import { markerInstanceStore } from '@stores/markerInstanceStore';
import { selectedStationIdStore } from '@stores/selectedStationStore';

import BriefStationInfo from '@ui/BriefStationInfo';

import BlueMarker from '@assets/blue-marker.svg';

import type { StationSummary } from 'types';

interface Props {
  station: StationSummary;
}

const StationMarker = ({ station }: Props) => {
  const { latitude, longitude, stationName, stationId } = station;
  const googleMap = useExternalValue(getGoogleMapStore());
  const queryClient = useQueryClient();

  const { briefStationInfoRoot, infoWindowInstance } = useExternalValue(
    getBriefStationInfoWindowStore()
  );

  const setMarkerInstanceState = useSetExternalState(markerInstanceStore);
  const setSelectedStationId = useSetExternalState(selectedStationIdStore);

  useEffect(() => {
    const container = document.createElement('div');

    const markerInstance = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: latitude, lng: longitude },
      map: googleMap,
      title: stationName,
      content: container,
    });

    const markerRoot = createRoot(container);
    markerRoot.render(<img src={BlueMarker} alt={stationName} />);

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
      googleMap.panTo(markerInstance.position);
      queryClient.invalidateQueries({ queryKey: ['stations'] });
    });

    return () => {
      const selectedStationId = getStoreSnapshot(selectedStationIdStore);

      setMarkerInstanceState((prevMarkerInstances) =>
        prevMarkerInstances.filter((stationMarker) => stationMarker.stationId !== stationId)
      );

      if (selectedStationId === stationId) {
        setSelectedStationId(null);
      }

      markerInstance.map = null;
    };
  }, []);

  return <></>;
};

export default StationMarker;
