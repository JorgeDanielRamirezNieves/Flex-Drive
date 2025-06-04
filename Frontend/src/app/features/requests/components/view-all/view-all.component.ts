import { ChatsService } from './../../../chat/services/chats.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Request } from '../../models/request';
import { RequestsService } from '../../services/requests.service';
import { catchError, finalize, map, Subscription, throwError } from 'rxjs';
import { observatorAny } from '../../../../core/tipo-any';
import { jwtDecode } from 'jwt-decode';
import { ServiceRentService } from '../../../services-rent/services/service-rent.service';
import { Service } from '../../../services-rent/models/service';
import { ContractsService } from '../../../contracts/services/contracts.service';
import { MessageService } from 'primeng/api';
import { Contract } from '../../../contracts/models/contract';

@Component({
  selector: 'app-view-all',
  standalone: false,
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.css',
})
export class ViewAllComponent {
  private suscribe: Subscription;
  public tmp: any;
  public requestsClient: Request[] | undefined;
  public requestsOwner: Request[] | undefined;
  public loadingRequests: boolean;
  public userUUID: string;
  public role: string;
  public token: any;
  public isCreatingContract: boolean; // Variable para controlar el estado de creación del contrato
  public contractService: Contract;
  public newChat: string = '';

  constructor(
    private requestService: RequestsService,
    private servicerRentService: ServiceRentService,
    private contractsService: ContractsService,
    private router: Router,
    private messageService: MessageService,
    private chatsService: ChatsService
  ) {
    window.scrollTo(0, 0);
    this.loadingRequests = true;
    this.suscribe = this.tmp;
    this.token = jwtDecode(localStorage.getItem('authToken') || '');
    this.role = this.token.rolUser.name;
    this.userUUID = this.token.uuid;
    this.isCreatingContract = false;
    this.contractService = {
      accordants: [],
      status: true,
      createdAt: new Date(),
      updatedAt: null,
      idService: '',
      idContractType: 'f2b0a1c4-3d8e-4f5b-9a6c-7d0e5f1a2b8d',
      idContractTypeLegal: '67e4ac9b-9e59-4549-887a-45d0dcb8c479',
      info: {},
    };
  }

  ngOnInit(): void {
    console.log(this.userUUID);
    this.getRequestsByClient();
    this.getRequestsByOwner();
  }

  ngOnDestroy(): void {
    if (this.suscribe) {
      this.suscribe.unsubscribe();
    }
  }

  private getRequestsByClient() {
    this.suscribe = this.requestService
      .getByClient(this.userUUID)
      .pipe(
        map((res: any) => {
          this.requestsClient = res;
        }),
        catchError((err) => {
          throw new Error(err);
        }),
        finalize(() => {
          this.loadingRequests = false;
        })
      )
      .subscribe(observatorAny);
  }

  private getRequestsByOwner() {
    this.suscribe = this.requestService
      .getByOwner(this.userUUID)
      .pipe(
        map((res: any) => {
          console.log(res);
          this.requestsOwner = res;
        }),
        catchError((err) => {
          throw new Error(err);
        }),
        finalize(() => {
          this.loadingRequests = false;
        })
      )
      .subscribe(observatorAny);
  }

  public approveRequest(uuid: string) {
    this.suscribe = this.requestService
      .changeStatus(uuid, 'approved')
      .pipe(
        map((res: any) => {
          console.log(res);
          this.createChat(uuid);
          this.createService(uuid);
        }),
        catchError((err) => {
          throw new Error(err);
        })
      )
      .subscribe(observatorAny);
  }

  public rejectRequest(uuid: string) {
    this.suscribe = this.requestService
      .changeStatus(uuid, 'rejected')
      .pipe(
        map((res: any) => {
          this.getRequestsByOwner();
          this.getRequestsByClient();
        }),
        catchError((err) => {
          throw new Error(err);
        })
      )
      .subscribe(observatorAny);
  }

  public negotiateRequest(uuid: string) {
    this.suscribe = this.requestService
      .changeStatus(uuid, 'negotiating')
      .pipe(
        map((res: any) => {
          console.log(res);
          this.createChat(uuid);
          this.router.navigate(['/user/activechats/' + this.newChat]);  
        }),
        catchError((err) => {
          throw new Error(err);
        })
      )
      .subscribe(observatorAny);
  }

  public createService(uuidRequest: string) {
    const service: Service = {
      idRequest: uuidRequest,
      status: 'for_take',
      createdAt: new Date(),
      updatedAt: null,
    };
    this.suscribe = this.servicerRentService
      .createServiceRent(service)
      .pipe(
        map((res: any) => {
          console.log(res);
          const request = this.requestsOwner?.find(
            (req) => req.uuid === uuidRequest
          );
          this.createContract(request?.idClient || '', res.uuid);
          this.router.navigate(['/services/details/' + res.uuid]);
        }),
        catchError((err) => {
          throw new Error(err);
        })
      )
      .subscribe(observatorAny);
  }
  public createContract(uuidOwner: string, uuidService: string) {
    this.isCreatingContract = true; // Indica que se está creando un contrato
    this.contractService.accordants = [this.userUUID, uuidOwner];
    this.contractService.idService = uuidService;
    this.suscribe = this.contractsService
      .createContract(this.contractService)
      .pipe(
        map((res: any) => {
          this.isCreatingContract = false; // Restablece el estado al finalizar
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Has aceptado los términos y condiciones de manera exitosa',
            life: 3000,
          });
        }),
        catchError((err) => {
          this.isCreatingContract = false; // Restablece el estado en caso de error
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear el contrato',
            life: 5000,
          });
          return throwError(() => err);
        }),
        finalize(() => {
          this.isCreatingContract = false;
        })
      )
      .subscribe(observatorAny);
  }
  public createChat(uuidRequest: string) {
    this.suscribe = this.chatsService
      .createChat({
        createdAt: new Date(),
        idrequest: uuidRequest,
        status: true,
      })
      .pipe(
        map((res: any) => {
          console.log(res);
          this.newChat = res.uuid;
        }),
        catchError((err) => {
          throw new Error(err);
        })
      )
      .subscribe(observatorAny);
  }
}
