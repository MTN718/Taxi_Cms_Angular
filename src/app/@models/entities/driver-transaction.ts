
import {Driver} from "./driver";
import {Operator} from "./operator";
import { TransactionType } from "./rider-transaction";
import { Request } from "./request";
import { PaymentGateway } from "./payment-gateway";


export class DriverTransaction {
    id:number;
    driver?:Driver;
    request?:Request;
    operator?:Operator;
    transactionTime:number;
    transactionType?:TransactionType;
    amount:number;
    paymentGateway?:PaymentGateway;
    currency: string;
    documentNumber?:string;
    details?:string;
        
}
