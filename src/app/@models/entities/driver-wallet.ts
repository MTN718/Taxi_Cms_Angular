
import { Driver } from "./driver";

export class DriverWallet {
    id: number;
    driver!: Driver;
    amount: number;
    currency: string;
}