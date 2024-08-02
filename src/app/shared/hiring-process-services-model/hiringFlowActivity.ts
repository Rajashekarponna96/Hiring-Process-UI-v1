import { Candidate } from "./candidate";
import { UserAccout } from "./userAccount";

export class HiringFlowActivity{
    id!: number;
    userAccount!: UserAccout;
    createdDate: any;
    hiringFlowType!: string;
    candidate!: Candidate;
}