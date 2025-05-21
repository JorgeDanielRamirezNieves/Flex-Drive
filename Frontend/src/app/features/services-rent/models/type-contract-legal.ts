import { Contract } from "./contract";

export class TypeContractLegal {
  public uuid: string;
  public name: string;
  public contractsByTypeLegal?: Contract[];

  constructor(uuid: string, name:string){
    this.uuid = uuid;
    this.name = name
  }
}
