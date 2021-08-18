
import {Media} from "./media";
import {Driver} from "./driver";

export class Car {
    id:number;
    title?:string;
    media?:Media;
    drivers:Driver[];
}
