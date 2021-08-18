
import {Complaint} from "./complaint";
import { ClientType } from './request-chat';


export class ComplaintType {
    id:number;
    title?:string;
    importance?:string;
    senderType:string;
    complaints:Complaint[];
}
