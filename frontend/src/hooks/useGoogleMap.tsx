import { createRoot } from 'react-dom/client';

import { useExternalValue, useSetExternalState } from '@utils/external-state';
import { getStoreSnapshot } from '@utils/external-state/tools';

import { getGoogleMapStore } from '@stores/googleMapStore';
import { markerInstanceStore } from '@stores/markerInstanceStore';
import { selectedStationIdStore } from '@stores/selectedStationStore';

import BlueMarker from '@assets/blue-marker.svg';

import { useStationSummary } from './useStationSummary';

import type { StationSummary } from 'types';

export const useGoogleMap = () => {
  const googleMap = useExternalValue(getGoogleMapStore());
  const setMarkerInstanceState = useSetExternalState(markerInstanceStore);
  const setSelectedStationId = useSetExternalState(selectedStationIdStore);
  const { openStationSummary } = useStationSummary();

  const renderStationMarker = (station: StationSummary) => {
    const { latitude, longitude, stationName, stationId } = station;
    const container = document.createElement('div');

    const markerInstance = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: latitude, lng: longitude },
      map: googleMap,
      title: stationName,
      content: container,
    });

    const markerRoot = createRoot(container);
    markerRoot.render(<img src={BlueMarker} alt={stationName} />);

    markerInstance.addListener('click', () => {
      openStationSummary(station, markerInstance);
    });

    setMarkerInstanceState((previewsMarkerInstances) => [
      ...previewsMarkerInstances,
      {
        stationId,
        markerInstance,
      },
    ]);

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
  };

  return { renderStationMarker };
};
