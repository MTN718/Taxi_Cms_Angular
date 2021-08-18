
import {Request} from "./request";

export enum MessageState {
    Sent = "sent",
    Delivered = "delivered",
    Seen = "seen"
}

export enum ClientType {
    Driver = 'd',
    Rider = 'r'
}

export class RequestChat {
    id:number;
    sentAt?:number;
    content?:string;
    sentBy:ClientType;
    state?:MessageState;
    request?:Request;
}

