import { User } from "../../user/models/user";
import { TypeReport } from "./type-report";

export class Report {
  public uuid: string;
  public description: string;
  public status: 'pending' | 'in_progress' | 'on_hold' | 'resolve';
  public createdAt: Date;
  public updatedAt: Date;
  public resolvedAt: Date;
  public idUser: string;
  public idAdmin: string;
  public priority: '0' | '1' | '2' | '3';
  public idTypeReport: string;
  public typeReport?: TypeReport;
  public reportsUsers?: User;
  public reportsAdmin?: User;

    constructor(
        uuid: string,
        description: string,
        status: 'pending' | 'in_progress' | 'on_hold' | 'resolve',
        createdAt: Date,
        updatedAt: Date,
        resolvedAt: Date,
        idUser: string,
        idAdmin: string,
        priority: '0' | '1' | '2' | '3',
        idTypeReport: string,
    ) {
        this.uuid = uuid;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.resolvedAt = resolvedAt;
        this.idUser = idUser;
        this.idAdmin = idAdmin;
        this.priority = priority;
        this.idTypeReport = idTypeReport;
    }
}
