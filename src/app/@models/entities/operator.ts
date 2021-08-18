
import {Media} from "./media";
import {DriverTransaction} from "./driver-transaction";
import {OperatorReminder} from "./operator-reminder";
import {OperatorToDo} from "./operator-todo";
import {RiderTransaction} from "./rider-transaction";
import { Request } from "./request";
import { Fleet } from './fleet';

export enum  PermissionDefault {
    View = 'view',
    Update = 'update',
    Delete = 'delete'
}

export class Operator {
    id:number;
    firstName?:string;
    lastName?:string;
    media?:Media;
    userName:string;
    password?:string;
    mobileNumber?:string;
    phoneNumber?:string;
    address?:string;
    fleet?: Fleet;
    permissionOperator:PermissionDefault[];
    permissionDriver?:PermissionDefault[];
    permissionRider?: PermissionDefault[];
    permissionTravel?: PermissionDefault[];
    permissionComplaint?: PermissionDefault[];
    permissionPaymentRequest?: PermissionDefault[];
    permissionPaymentGateway?: PermissionDefault[];
    permissionLibrary?:PermissionDefault[];
    status:string;
    permissionCar?: PermissionDefault[];
    permissionService?: PermissionDefault[];
    permissionRegion?: PermissionDefault[];
    requests: Request[];
    driverTransactions:DriverTransaction[];
    operatorReminders:OperatorReminder[];
    operatorTodos:OperatorToDo[];
    riderTransactions:RiderTransaction[];
}
