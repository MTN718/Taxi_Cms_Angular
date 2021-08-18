
import {Rider} from "./rider";
import {Operator} from "./operator";
import { Request } from "./request";
import { PaymentGateway, PaymentGatewayType } from "./payment-gateway";

export enum TransactionType {
    Cash = 'Cash',
    Bank = 'Bank',
    Gift = 'Gift',
    Commission = 'Commission',
    Travel = 'Travel',
    InApp = 'InApp',
    TransferToBank = 'TransferToBank'
}


export class RiderTransaction {
    id:number;
    rider?:Rider;
    request?:Request;
    operator?:Operator;
    transactionTime:number;
    transactionType?:TransactionType;
    paymentGateway?:PaymentGateway;
    amount:number;
    currency: string;
    documentNumber?:string;
    details?:string;
}
