import { UserAccout } from "./userAccount";

export class Recruiter {
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    mobile!: string;
    userAccout?: UserAccout;
  status: any;
  content!: any[];
}
