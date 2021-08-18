
import {Car} from "./car";
import {Media} from "./media";
import {DriverTransaction} from "./driver-transaction";
import {PaymentRequest} from "./payment-request";
import {Request} from "./request";
import {RequestReview} from "./request-review";
import { Gender } from "../enums/enums";
import { Service } from "./service";
import { DriverToGateway } from "./driver-to-gateway";
import { DriverWallet } from "./driver-wallet";
import { Fleet } from './fleet';


export enum DriverStatus {
    Online = 'online',
    Offline = 'offline',
    Blocked = 'blocked',
    InService = 'in service',
    WaitingDocuments = 'waiting documents',
    PendingApproval = 'pending approval',
    SoftReject = 'soft reject',
    HardReject = 'hard reject',
}

export class Driver {
    id:number;
    firstName?:string;
    lastName?:string;
    certificateNumber?:string;
    lastSeenTimestamp?:number;
    mobileNumber?:number;
    email?:string;
    wallet: DriverWallet[];
    fleet: Fleet;
    car?:Car;
    carColor?:string;
    carProductionYear?:number;
    carPlate?:string;
    carMedia?:Media;
    status:DriverStatus;
    rating?:number;
    reviewCount:number;
    media?:Media;
    gender:Gender;
    registrationTimestamp:Date;
    accountNumber?:string;
    address?:string;
    infoChanged:boolean;
    notificationPlayerId?:string;
    documentsNote?:string;
    documents:Media[];
    transactions:DriverTransaction[];
    paymentRequests:PaymentRequest[];
    requests:Request[];
    requestReviews:RequestReview[];
    services: Service[];
    driverToGateways?: DriverToGateway[];
}
