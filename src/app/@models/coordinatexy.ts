

export default class CoordinateXY {
    x: number;
    y: number;
}

export class Coordinate {
    lat: number;
    lng: number;
}

export type DriverLocation = {
    location: Coordinate
}

export type DriverLocationWithId = DriverLocation & { driverId: number }

export type DriverLocationWithDist = DriverLocation & { distance: number }

export type DriverLocationWithDistAndId = DriverLocationWithDist & { driverId: number }