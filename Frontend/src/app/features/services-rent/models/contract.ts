export class Contract {
  public uuid: string;
  public info: any;
  public createdAt: Date;
  public updatedAt: Date;
  public status: boolean;
  public idContractType: string;
  public idContractTypeLegal: string;
  public idService: string;
  public accordants: string[];
  public typeContractByContract?: any;
  public typeContractLegalByContract?: any;
  constructor(
    uuid: string,
    info: any,
    createdAt: Date,
    updatedAt: Date,
    status: boolean,
    idContractType: string,
    idContractTypeLegal: string,
    idService: string,
    accordants: string[]
  ) {
    this.uuid = uuid;
    this.info = info;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.status = status;
    this.idContractType = idContractType;
    this.idContractTypeLegal = idContractTypeLegal;
    this.idService = idService;
    this.accordants = accordants;
  }
}
