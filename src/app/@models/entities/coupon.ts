
import { Service } from "./service";
import { Request } from "./request";
import { Rider } from "./rider";


export class Coupon {
    id?:number;
    title?:string;
    description?:string;
    code?:string;
    manyUsersCanUse?:number;
    manyTimesUserCanUse?:number;
    minimumCost?:number;
    maximumCost?:number;
    startTimestamp?:number;
    expirationTimestamp?:number;
    discountPercent?:number;
    discountFlat?:number;
    creditGift?:number;
    isEnabled?:boolean;
    isFirstTravelOnly?:boolean;
    services?:Service[];
    riders?:Rider[];
    requests?:Request[];
}
