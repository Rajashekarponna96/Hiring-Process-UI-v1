
import { Currency } from "./currency";
import { Education } from "./education";
import { Experience } from "./experience";
import { Job } from "./job";
import { Source } from "./source";
import { TalentPool } from "./talentpool";
import { Location } from "./location";
import { Vendor } from "./vendor";
import { UserAccout } from "./userAccount";


export class Candidate {
    id: number | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    middleName:string | undefined
    email!: string; 
    mobile!: string; 
    alterMobile:string | undefined
    source!: Source;
    stage!: string;
    current!: Location;
    preferred!: Location;
    avialToJoin!:string
    currentSalary!:number
    expectedSalary: number | undefined;
    currency!: Currency;
    gender: string | undefined;
    dateOfBirth: Date | undefined;
    skills:string[] =['']
    experiences!: Experience[];
    educations!: Education[];
    talentPool!: TalentPool;
    job!:Job
    vendor!: Vendor;
    createdBy!: UserAccout;
    modifiedBy!: UserAccout;
    createdTimestamp: Date;
    fileName:String;
    primarySkill:String;
    


}

