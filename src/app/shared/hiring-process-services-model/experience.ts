import { Candidate } from "./candidate";

export class Experience{
    company :string | undefined;
    jobTitle:string | undefined;
    currentlyWokring:boolean | undefined;
    dateOfJoining:string | undefined;
    dateOfRelieving:string | undefined;
    location!: string;
    candidate!: Candidate;


}