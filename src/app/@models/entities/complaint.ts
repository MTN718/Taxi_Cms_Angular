
import {Request} from "./request";
import {ComplaintType} from "./complaint-type";
import { ClientType } from './request-chat';


export class Complaint {
    id:number;
    request?:Request;
    complaintType?:ComplaintType;
    requestedBy:ClientType;
    subject?:string;
    content?:string;
    isReviewed:boolean;
    inscriptionTimestamp:Date;
    reviewTimestamp?:Date;
}
