
import { PaymentGateway } from "./payment-gateway";
import { Driver } from "./driver";

export class DriverToGateway {
    id: number;
    driver!: Driver;
    gateway!: PaymentGateway;
}