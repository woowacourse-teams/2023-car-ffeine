export interface DisplayPosition {
  longitude: number;
  latitude: number;
  longitudeDelta: number;
  latitudeDelta: number;
  zoom: number;
}

export interface Bounds {
  northEast: {
    latitude: number;
    longitude: number;
  };
  southWest: {
    latitude: number;
    longitude: number;
  };
}
