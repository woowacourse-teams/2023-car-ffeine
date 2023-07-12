export interface googleMap {
  googleMap: google.maps.Map;
}

export interface Station {
  stationId: number;
  stationName: string;
  companyName: string;
  chargers: {
    type: string;
    price: number;
    capacity: number;
  }[];
  isParkingFree: boolean;
  operatingTime: string;
  detailLocation: string;
  latitude: number;
  longitude: number;
  isPrivate: boolean;
  totalCount: number;
  availableCount: number;
}

export interface DisplayPosition {
  longitude: number;
  latitude: number;
  longitudeDelta: number;
  latitudeDelta: number;
}
