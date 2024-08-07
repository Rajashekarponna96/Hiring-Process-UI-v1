import { Role } from "./role";

export class Permission {
    id!: number;
    name!: string;
    description!: string;
    role!: Role;
    icon!: string;
}
