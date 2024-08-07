import { Candidate } from "./candidate"

export class Education{
    course:string | undefined
    branch:string | undefined
    startOfCourse!: Date 
    endOfCourse!: Date 
    college:string | undefined
    location:string | undefined
    candidate!: Candidate
    university!: string
    
   
    

}