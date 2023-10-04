import { getStoreSnapshot } from '@utils/external-state/tools';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';
import type { StationMarkerInstance } from '@stores/google-maps/markerInstanceStore';

import { useStationSummary } from '@hooks/google-maps/useStationSummary';
import useMediaQueries from '@hooks/useMediaQueries';

import { useNavigationBar } from '@ui/Navigator/NavigationBar/hooks/useNavigationBar';
import StationDetailsWindow from '@ui/StationDetailsWindow';

import type { StationDetails, StationMarker, StationSummary } from '@type';

export const useRenderStationMarker = () => {
  const googleMap = getStoreSnapshot(getGoogleMapStore());

  const { openStationSummary } = useStationSummary();
  const { openLastPanel } = useNavigationBar();
  const screen = useMediaQueries();

  const createNewMarkerInstance = (marker: StationDetails) => {
    const { latitude: lat, longitude: lng, stationName, stationId } = marker;

    const pinViewScaled = new google.maps.marker.PinElement({
      scale: 0.5,
    });

    const markerInstance = new google.maps.marker.AdvancedMarkerElement({
      position: { lat, lng },
      title: stationName,
      content: pinViewScaled.element,
    });

    bindMarkerClickHandler([{ stationId, markerInstance }]);

    return markerInstance;
  };

  const createNewMarkerInstances = (
    prevMarkerInstances: StationMarkerInstance[],
    markers: StationMarker[]
  ) => {
    const newMarkers = markers.filter((marker) =>
      prevMarkerInstances.every((prevMarker) => prevMarker.stationId !== marker.stationId)
    );

    const newMarkerInstances = newMarkers.map((marker) => {
      const { latitude: lat, longitude: lng, stationName, stationId } = marker;

      const pinViewScaled = new google.maps.marker.PinElement({
        scale: 0.6,
        background: marker.availableCount > 0 ? '#3373DC' : '#EA4335',
        borderColor: marker.availableCount > 0 ? '#324F8E' : '#B8312F',
        glyph: '',
      });

      const markerInstance = new google.maps.marker.AdvancedMarkerElement({
        map: googleMap,
        position: { lat, lng },
        title: stationName,
        content: pinViewScaled.element,
      });

      return {
        stationId,
        markerInstance,
      };
    });

    bindMarkerClickHandler(newMarkerInstances);

    return newMarkerInstances;
  };

  const removeMarkersOutsideBounds = (
    prevMarkerInstances: StationMarkerInstance[],
    currentMarkers: StationMarker[]
  ) => {
    const markersOutOfBounds = prevMarkerInstances.filter(
      (prevMarker) =>
        !currentMarkers.some((currentMarker) => currentMarker.stationId === prevMarker.stationId)
    );

    markersOutOfBounds.forEach((marker) => {
      marker.markerInstance.map = null;
    });
  };

  const removeAllMarkers = (prevMarkerInstances: StationMarkerInstance[]) => {
    prevMarkerInstances.forEach((marker) => {
      marker.markerInstance.map = null;
    });
  };

  const getRemainedMarkerInstances = (
    prevMarkerInstances: StationMarkerInstance[],
    currentMarkers: StationMarker[]
  ) => {
    return prevMarkerInstances.filter((markerInstance) =>
      currentMarkers.some((marker) => marker.stationId === markerInstance.stationId)
    );
  };

  const renderMarkerInstances = (
    newMarkerInstances: StationMarkerInstance[],
    markers: StationMarker[] | StationSummary[]
  ) => {
    newMarkerInstances.forEach(({ markerInstance, stationId }) => {
      // const container = document.createElement('div');
      // markerInstance.content = container;
      // markerInstance.map = googleMap;
      // const markerInformation = markers.find(
      //   (stationMarker) => stationMarker.stationId === stationId
      // );
      // createRoot(container).render(<DotMarker station={markerInformation} />);
    });
  };

  const bindMarkerClickHandler = (markerInstances: StationMarkerInstance[]) => {
    markerInstances.forEach(({ markerInstance, stationId }) => {
      markerInstance.addListener('click', () => {
        openStationSummary(stationId, markerInstance);

        if (!screen.get('isMobile')) {
          openLastPanel(<StationDetailsWindow stationId={stationId} />);
        }
      });
    });
  };

  return {
    createNewMarkerInstance,
    createNewMarkerInstances,
    removeMarkersOutsideBounds,
    getRemainedMarkerInstances,
    renderMarkerInstances,
    removeAllMarkers,
  };
};
