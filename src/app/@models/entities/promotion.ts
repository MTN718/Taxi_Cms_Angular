
import { Media } from "./media";


export class Promotion {
    id?: number;
    title?: string;
    description?: string;
    media?: Media;
    startTimestamp?: number;
    expirationTimestamp?: number;
}
