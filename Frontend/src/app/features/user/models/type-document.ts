import { User } from "./user";

export class TypeDocument {
    public uuid: string;
    public name: string;
    public usersTypeDocument?: User[];
    
    constructor(uuid: string, name: string) {
        this.uuid = uuid;
        this.name = name;
    }
}
