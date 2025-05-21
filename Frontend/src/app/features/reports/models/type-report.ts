import { Report } from './report';

export class TypeReport {
  public uuid: string;
  public name: string;
  public reportsTypeReport?: Report[];
  constructor(uuid: string, name: string) {
    this.uuid = uuid;
    this.name = name;
  }
}
