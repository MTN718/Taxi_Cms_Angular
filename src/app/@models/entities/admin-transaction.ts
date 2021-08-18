import { Request } from './request';
import { PaymentGateway } from './payment-gateway';
import { Operator } from './operator';

export enum AdminTransactionType {
    Commission = "Commission",
    Withdraw = "Withdraw"
}

export class AdminTransaction {
    id: number;
    transactionTime:number;
    transactionType?:AdminTransactionType;
    amount:number;
    currency: string;
    documentNumber?:string;
    details?:string;
    paymentGateway?:PaymentGateway;
    request?:Request;
    operator?:Operator;
}