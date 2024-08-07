import { Permission } from "./permission";

export class Role {
    id!: number;
    name!: string;
    description!: string;
    permissions!: Permission[]; // Change 'any' to 'Permission[]'
}
