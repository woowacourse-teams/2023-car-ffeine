import { MarkerClusterer } from '@googlemaps/markerclusterer';

import { store } from '@utils/external-state';

import { getGoogleMapStore } from '@stores/googleMapStore';

export const getMarkerClustererStore = (() => {
  let markerClusterer: MarkerClusterer;

  return () => {
    if (!markerClusterer) {
      const googleMap = getGoogleMapStore().getState();
      markerClusterer = new MarkerClusterer({
        map: googleMap,
        markers: [],
        algorithmOptions: { maxZoom: 30 },
      });
      markerClusterer.setMap(googleMap);
    }

    return store<MarkerClusterer>(markerClusterer);
  };
})();
