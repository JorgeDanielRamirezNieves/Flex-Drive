export class Contract {
  public uuid?: string;
  public info: any;
  public createdAt: Date;
  public updatedAt: Date | null;
  public status: boolean;
  public idContractType: string;
  public idContractTypeLegal: string;
  public idService: string | null;
  public accordants: string[];
  public typeContractByContract?: any;
  public typeContractLegalByContract?: any;
  constructor(
    info: any,
    createdAt: Date,
    updatedAt: Date | null,
    status: boolean,
    idContractType: string,
    idContractTypeLegal: string,
    idService: string | null,
    accordants: string[]
  ) {
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
