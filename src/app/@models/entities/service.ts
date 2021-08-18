
import { ServiceCategory } from "./service-category";
import { Request } from "./request";
import { Region } from "./region";
import { Media } from "./media";
import { Coupon } from "./coupon";

export enum DistanceFee {
    None = 'None',
    PickupToDestination = 'PickupToDestination'
}

export enum FeeEstimationMode {
    Static = 'Static',
    Dynamic = 'Dynamic',
    Ranged = 'Ranged',
    RangedStrict = 'RangedStrict',
    Disabled = 'Disabled'
}

export enum PaymentMethod {
    CashCredit = 'CashCredit',
    OnlyCredit = 'OnlyCredit',
    OnlyCash = 'OnlyCash'
}

export enum PaymentTime {
    PrePay = 'PrePay',
    PostPay = 'PostPay'
}

export enum QuantityMode {
    Singular = 'Singular',
    Multiple = 'Multiple'
}

export enum BookingMode {
    OnlyNow = "OnlyNow",
    Time = "Time",
    DateTime = "DateTime",
    DateTimeAbosoluteHour = "DateTimeAbosoluteHour"
}

export interface Service {
    id?: number;
    category?: ServiceCategory;
    title?: string;
    media?:Media;
    coupons?: Coupon[];
    baseFare?: number;
    distanceFeeMode?: DistanceFee;
    perHundredMeters?: number;
    perMinuteWait?: number;
    perMinuteDrive?: number;
    availableTimeFrom?: string;
    availableTimeTo?: string;
    feeEstimationMode?: FeeEstimationMode;
    canEnableVerificationCode?: boolean;
    providerSharePercent?: number;
    providerShareFlat?: number;
    paymentMethod?: PaymentMethod;
    paymentTime?: PaymentTime;
    prePayPercent?: number;
    rangePlusPercent?: number;
    rangeMinusPercent?: number;
    quantityMode?: QuantityMode;
    bookingMode?: BookingMode;
    eachQuantityFee?: number;
    maxQuantity?: number;
    maxDestinationDistance?: number;
    regions?: Region[];
    requests?: Request[];
}
