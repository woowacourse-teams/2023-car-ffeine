export interface googleMap {
  googleMap: google.maps.Map;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Station extends Coordinates {
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
  isPrivate: boolean;
  totalCount: number;
  availableCount: number;
}

export interface DisplayPosition extends Coordinates {
  longitudeDelta: number;
  latitudeDelta: number;
}
