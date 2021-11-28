export interface Location {
  coords?: {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude: number | null;
    heading: number | null;
    speed: number | null;
    altitudeAccuracy?: number | null;
  };
  timestamp?: number;
}
