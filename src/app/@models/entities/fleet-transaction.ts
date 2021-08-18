import { Operator } from "./operator";
import { Driver } from "./driver";
import { Request } from "./request";
import { Fleet } from "./fleet";

export enum FleetTransactionType {
    Commission = "Commission",
    Withdraw = "Withdraw"
}

export class FleetTransaction {
    id: number;
    transactionTime:number;
    transactionType?:FleetTransactionType;
    amount:number;
    currency: string;
    documentNumber?:string;
    details?:string;
    fleet?:Fleet;
    driver?:Driver;
    request?:Request;
    operator?:Operator;
}