import { Service } from "./service";


export class Region {
    id?: number;
    name?: string;
    currency?: string;
    enabled?: boolean;
    location?: {lat: number, lng: number}[][];
    services?:Service[];

}
