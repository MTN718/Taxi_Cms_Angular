
import { PaymentGateway } from "./payment-gateway";
import { Rider } from "./rider";

export class RiderToGateway {
    id: number;
    rider!: Rider;
    gateway!: PaymentGateway;
    customerId: string;
}