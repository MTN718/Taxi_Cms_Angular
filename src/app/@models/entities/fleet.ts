
import { Operator } from "./operator";
import { Driver } from "./driver";
import { FleetTransaction } from "./fleet-transaction";
import { FleetWallet } from "./fleet-wallet";

export class Fleet {
    id?: number;

    name?: string;

    commissionSharePercent?: number;

    mobileNumber?: number;

    phoneNumber?: number;

    accountNumber?: string;

    address?: string;

    operators?: Operator[];

    drivers?: Driver[];

    wallet?: FleetWallet[];

    transactions?: FleetTransaction[];
}