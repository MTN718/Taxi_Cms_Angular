import {Media} from './media';
import {RiderAddress} from './rider-address';
import {RiderTransaction} from './rider-transaction';
import {Request} from './request';
import { Gender } from '../enums/enums';
import { Coupon } from './coupon';
import { RiderToGateway } from './rider-to-gateway';
import { RiderWallet } from './rider-wallet';

export enum RiderStatus {
    Enabled = 'enabled',
    Blocked = 'blocked'
}

export class Rider {
    id:number;
    firstName?:string;
    lastName?:string;
    mobileNumber?:number;
    status: RiderStatus;
    registrationTimestamp: number;
    birthTimestamp?: Date;
    media?:Media;
    email?:string;
    gender:Gender;
    referrer?:Rider;
    wallet: RiderWallet[];
    address?:string;
    infoChanged:boolean;
    notificationPlayerId?:string;
    riders:Rider[];
    riderAddresss:RiderAddress[];
    coupons:Coupon[];
    riderTransactions:RiderTransaction[];
    gatewayIds?: RiderToGateway[];
    requests:Request[];
}
