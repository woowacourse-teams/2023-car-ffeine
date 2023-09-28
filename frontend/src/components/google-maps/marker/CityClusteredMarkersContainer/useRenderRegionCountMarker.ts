import { useExternalValue } from '@utils/external-state';

import { getGoogleMapStore } from '@stores/google-maps/googleMapStore';

import type { RegionCount } from './types';

export const useRenderRegionCountMarker = () => {
  const googleMap = useExternalValue(getGoogleMapStore());

  const renderRegionCountMarker = (regionCount: RegionCount) => {
    const { latitude, longitude, count, regionName } = regionCount;

    const markerInstance = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: latitude, lng: longitude },
      map: googleMap,
      title: regionName,
    });

    markerInstance.addListener('click', () => {
      alert(`${regionName} : ${count}개`);
    });

    return () => {
      markerInstance.map = null;
    };
  };

  return { renderRegionCountMarker };
};
