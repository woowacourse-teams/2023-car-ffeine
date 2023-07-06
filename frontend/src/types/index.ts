export interface Position {
  lat: number;
  lng: number;
}

export interface Marker extends Position {
  id: number;
  title: string;
}
