import { Role } from "./role";

export class UserAccout {
    id!: number; 
    userName!: string;
    password!: string;
    active!: boolean;
    role?: Role;
}