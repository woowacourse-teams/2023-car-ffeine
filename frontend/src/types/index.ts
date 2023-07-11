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
