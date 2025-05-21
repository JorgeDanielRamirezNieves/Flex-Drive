import { User } from './user';

export class Role {
  public uuid: string;
  public name: string;
  public usersRole?: User[];
  constructor(uuid: string, name: string) {
    this.uuid = uuid;
    this.name = name;
  }
}
