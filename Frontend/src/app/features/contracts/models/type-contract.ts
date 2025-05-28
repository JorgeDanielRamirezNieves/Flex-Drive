import { Contract } from "./contract";

export class TypeContract {
    public uuid: string;
      public name: string;
      public contractsByType?: Contract[];
    
      constructor(uuid: string, name:string){
        this.uuid = uuid;
        this.name = name
      }
}
