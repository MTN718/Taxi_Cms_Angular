
import {Request} from "./request";
import {Driver} from "./driver";


export class RequestReview {
    id:number;
    score?:number;
    review?:string;
    reviewTimestamp?:Date;
    request?:Request;
    driver?:Driver;
}
