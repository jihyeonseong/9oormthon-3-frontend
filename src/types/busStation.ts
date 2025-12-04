export type BusStation = {
  stationId: number;
  stationName: string;
  longitude: number;
  latitude: number;
  information: string;
  directionName: string;
};

export type SelectedStation = {
  name: string;
  stationId: string;
  direction: string;
};
