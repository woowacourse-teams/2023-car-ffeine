import { createRoot } from 'react-dom/client';

import { useExternalValue } from '@utils/external-state';

import { getGoogleMapStore, googleMapActions } from '@stores/google-maps/googleMapStore';

import RegionMarker from '../components/RegionMarker';
import type { Region } from '../types';

export const useRenderRegionMarker = () => {
  const googleMap = useExternalValue(getGoogleMapStore());

  const renderRegionMarker = (region: Region) => {
    const { latitude, longitude, count, regionName } = region;

    const container = document.createElement('div');

    container.style.opacity = '0';
    container.classList.add('marker-animation');
    container.addEventListener('animationend', () => {
      container.classList.remove('marker-animation');
      container.style.opacity = '1';
    });

    const markerInstance = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: latitude, lng: longitude },
      map: googleMap,
      title: regionName,
      content: container,
    });

    createRoot(container).render(<RegionMarker count={count} regionName={regionName} />);

    markerInstance.addListener('click', () => {
      googleMapActions.moveTo({ lat: latitude, lng: longitude }, 12);
    });

    return () => {
      markerInstance.map = null;
    };
  };

  return { renderRegionMarker };
};
