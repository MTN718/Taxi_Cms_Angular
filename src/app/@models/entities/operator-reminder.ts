
import {Operator} from "./operator";

export enum ReminderImportance {
    Low = 'low',
    Medium = 'medium',
    High = 'high'
}

export class OperatorReminder {
    id:number;
    operator:Operator;
    title?:string;
    due?:string;
    importance:ReminderImportance;
}
