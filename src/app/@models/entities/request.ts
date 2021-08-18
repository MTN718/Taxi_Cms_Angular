
import { Driver } from "./driver";
import { Rider } from "./rider";
import { Service } from "./service";
import { Complaint } from "./complaint";
import { RequestChat } from "./request-chat";
import { RequestReview } from "./request-review";
import { Operator } from "./operator";
import CoordinateXY from "../coordinatexy";
import { Coupon } from "./coupon";
import { RiderTransaction } from "./rider-transaction";
import { DriverTransaction } from "./driver-transaction";
import { AdminTransaction } from './admin-transaction';
import { FleetTransaction } from './fleet-transaction';

export enum RequestStatus {
    Requested = 'Requested',
    NotFound = 'NotFound',
    NoCloseFound = 'NoCloseFound',
    Found = 'Found',
    DriverAccepted = 'DriverAccepted',
    Arrived = 'Arrived',
    WaitingForPrePay = 'WaitingForPrePay',
    DriverCanceled = 'DriverCanceled',
    RiderCanceled = 'RiderCanceled',
    Started = 'Started',
    WaitingForPostPay = 'WaitingForPostPay',
    WaitingForReview = 'WaitingForReview',
    Finished = 'Finished',
    Booked = 'Booked',
    Expired = 'Expired'
}

export enum RequestLabel {
    None = 'none',
    Blue = 'blue',
    Red = 'red',
    Green = 'green',
    Yellow = 'yellow',
    Purple = 'purple'
}

export class Request {
    id: number;
    driver?: Driver;
    rider?: Rider;
    status?: RequestStatus;
    addresses?: string[];
    points?: CoordinateXY[];
    distanceBest?: number;
    durationBest?: number;
    costBest?: number;
    durationReal?: number;
    distanceReal?: number;
    cost?: number;
    rating?: number;
    requestTimestamp?: number;
    etaPickup?: number;
    expectedTimestamp?: number;
    startTimestamp?: number;
    finishTimestamp?: number;
    log?: string;
    label?: RequestLabel;
    currency: string;
    isHidden?: boolean;
    costAfterCoupon?: number;
    paidAmount?: number;
    confirmationCode?: number;
    coupon?: Coupon;
    service?: Service;
    operator?: Operator;
    complaints?: Complaint[];
    travelChats?: RequestChat[];
    review?: RequestReview;
    riderTransactions: RiderTransaction[];
    driverTransactions: DriverTransaction[];
    adminTransactions: AdminTransaction[];
    fleetTransactions: FleetTransaction[];
}
