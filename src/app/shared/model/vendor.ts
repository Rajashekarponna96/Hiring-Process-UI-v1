import { UserAccout } from "./userAccount";


export class Vendor{
    id!: number;
    vendorName!: string;
    location!: string;
    email!: string;
    mobile!: string;
    userAccout?: UserAccout;
}