export interface Position {
  lat: number;
  lng: number;
}

export interface Station extends Position {
  id: number;
  title: string;
}
