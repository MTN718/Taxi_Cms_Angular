
import { RiderToGateway } from "./rider-to-gateway";
import { DriverToGateway } from "./driver-to-gateway";
import { DriverTransaction } from "./driver-transaction";
import { RiderTransaction } from "./rider-transaction";
import { AdminTransaction } from './admin-transaction';

export enum PaymentGatewayType {
    Stripe = 'stripe',
    BrainTree = 'braintree',
    Flutterwave = 'flutterwave',
    PayGate = 'paygate',
    /*PayU = 'payu',
    Paystack = 'paystack',
    Razorpay = 'razorpay',
    Paytm = 'paytm'   */
}

export class PaymentGateway {
    id?:number;
    enabled?: boolean;
    title?:string;
    type?:PaymentGatewayType;
    publicKey?: string;
    privateKey?: string;
    merchantId?: string;
    driverToGateways?: DriverToGateway[];
    riderToGateways?: RiderToGateway[];
    driverTransactions?: DriverTransaction[];
    riderTransactions?: RiderTransaction[];
    adminTransactions?: AdminTransaction[];
}
