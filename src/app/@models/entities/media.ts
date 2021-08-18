
import {Car} from "./car";
import {Operator} from "./operator";
import {Promotion} from "./promotion";
import {Rider} from "./rider";
import { Driver } from "./driver";
import { Service } from "./service";

export enum MediaType {
    Car = 'car',
    Service = 'service',
    DriverImage = 'driver image',
    DriverHeader = 'driver header',
    OperatorImage = 'operator image',
    RiderImage = 'rider image',
    Promotion = 'promotion',
    Document = 'document'
}

export enum PathType {
    Relative = 'relative',
    Absolute = 'absolute'
}

export enum MediaPrivacyLevel {
    Low = 'low',
    Medium = 'medium',
    High = 'high'
}

export class Media {
    id:number;
    title?:string;
    address?:string;
    type?:MediaType;
    privacyLevel:MediaPrivacyLevel;
    pathType:PathType;
    base64?:string;
    cars:Car[];
    drivers:Driver[];
    drivers2:Driver[];
    operators:Operator[];
    promotions:Promotion[];
    riders:Rider[];
    riders2:Rider[];
    services:Service[];
}
