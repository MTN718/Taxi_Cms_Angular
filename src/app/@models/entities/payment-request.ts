
import {Driver} from "./driver";

export enum PaymentRequestStatus {
    Pending = 'Pending',
    Paid = 'Paid',
    Rejected = 'Rejected'
}

export class PaymentRequest {
    id?:number;
    driver?:Driver;
    requestTimestamp:Date;
    paymentTimestamp?:Date;
    accountNumber?:string;
    status?:PaymentRequestStatus;
    comment?:string;
}
