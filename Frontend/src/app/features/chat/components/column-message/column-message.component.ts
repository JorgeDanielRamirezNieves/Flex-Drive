import { NotificationsService } from './../../../notifications/services/notifications.service';
import { Notification } from './../../../notifications/models/notification';
import { RequestsService } from './../../../requests/services/requests.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, map, Subscription, throwError } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chat } from '../../models/chat';
import { ChatsService } from '../../services/chats.service';
import { jwtDecode } from 'jwt-decode';
import { observatorAny } from '../../../../core/tipo-any';
import { Message } from '../../models/message';
import { MessageService } from '../../services/message.service';
import { MessageService as primeMessages } from 'primeng/api';
import { CommonServiceService } from '../../../../shared/services/common-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ContextMenu } from 'primeng/contextmenu';
import { Drawer } from 'primeng/drawer';
import { ServiceRentService } from '../../../services-rent/services/service-rent.service';
import { ContractsService } from '../../../contracts/services/contracts.service';
import { Contract } from '../../../contracts/models/contract';
import { Service } from '../../../services-rent/models/service';

interface ChatMessage {
  sender: string;
  text: string;
}

interface User {
  names: string;
  lastName: string;
  messages: ChatMessage[];
  idService: number;
}

@Component({
  selector: 'app-column-message',
  standalone: false,
  templateUrl: './column-message.component.html',
  styleUrl: './column-message.component.css',
})
export class ColumnMessageComponent implements OnInit, OnDestroy {
  public searchTerm: string = '';
  public newMessage: string = '';
  public activeSection: string = 'todos';
  public selectedChat: Chat | null = null;
  public isOwner: boolean = false;
  public subscription: Subscription;
  public tmp: any;
  public token: any;
  public userUUID: string;
  public chats: Chat[] = [];
  public menuItems = [
    {
      title: 'Servicios en negociación',
      section: 'negociacion',
      chats: this.getChatBySection(),
    },
    {
      title: 'Servicios en proceso',
      section: 'en-proceso',
      chats: this.getChatBySection(),
    },
    {
      title: 'Todos los servicios',
      section: 'todos',
      chats: this.chats,
    },
  ];
  public uuidChat: string;
  public image: File | null = null;
  public urlImage: string = '';
  public contractService: Contract;
  public isUploaded: boolean = false;
  public isLoading: boolean = false;
  public items: any[] = [
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      command: () => {
        this.isLoading = !this.isLoading;
        if (this.isLoading) {
          this.openDrawer();
        }
      },
      class: 'rounded-t-2',
    },
    {
      label: 'Elminar',
      icon: 'pi pi-trash',
      command: () => {
        this.isLoading = !this.isLoading;
        if (this.isLoading) {
          this.changeStatusMessage(this.selectedMessageUUID || '', false);
        }
      },
      class: 'rounded-b-2',
    },
  ];
  @ViewChild('cm') cm!: ContextMenu;
  @ViewChild('drawerRef') drawerRef!: Drawer;

  public selectedMessageUUID: string | undefined;
  public visible: boolean = false;
  public modalVisible: boolean = false;
  public minDate: Date = new Date();
  public deliveryDate: Date | undefined;
  public returnDate: Date | undefined;
  public isCreatingContract: boolean = false;
  public notification: Notification;

  constructor(
    private chatsService: ChatsService,
    private messageService: MessageService,
    private RequestsService: RequestsService,
    private servicerRentService: ServiceRentService,
    private contractsService: ContractsService,
    private primeMessages: primeMessages,
    private commonServices: CommonServiceService,
    private notificationsService: NotificationsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.subscription = this.tmp;
    this.token = jwtDecode(localStorage.getItem('authToken') || '');
    this.userUUID = this.token.uuid;
    this.uuidChat = '';
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
    this.notification = {
      idUser: '',
      description: '',
      idTypeNotification: '2e2a1d92-5774-4521-8f1f-c0a5ff6f5a71',
      status: true,
      createdAt: new Date(),
      updatedAt: null,
      sendDate: new Date(),
      seenDate: null,
    };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.getChats();
    if (this.activatedRoute.snapshot.params['uuid']) {
      this.uuidChat = this.activatedRoute.snapshot.params['uuid'];
      this.selectChat(this.uuidChat);
    }
  }

  openDrawer() {
    this.visible = true;
    console.log(this.selectedMessageUUID);
  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  public getChats() {
    this.subscription = this.chatsService
      .getAllChats(this.userUUID)
      .pipe(
        map((res: any) => {
          this.chats = res;
          console.log('Chats obtenidos:', this.chats);

          if (this.activatedRoute.snapshot.params['uuid']) {
            this.uuidChat = this.activatedRoute.snapshot.params['uuid'];
            this.selectChat(this.uuidChat);
          }
        }),
        catchError((error) => {
          console.error('Error fetching chats:', error);
          return [];
        })
      )
      .subscribe(observatorAny);
  }

  getChatBySection(): Chat[] {
    if (this.activeSection === 'negociacion') {
      return this.chats.filter(
        (chat) => chat.request?.status === 'negotiating'
      );
    } else if (this.activeSection === 'en-proceso') {
      return this.chats.filter((chat) => chat.request?.status === 'approved');
    } else {
      return this.chats; // Todos los chats
    }
  }

  setSection(section: string) {
    this.activeSection = section;
    this.menuItems.forEach((item) => {
      item.chats = this.getChatBySection();
    });
    this.selectedChat = null;
  }

  selectChat(uuid: string) {
    this.selectedChat = this.chats.find((chat) => chat.uuid === uuid) || null;
    this.router
      .navigateByUrl(`/user/activechats/${uuid}`, { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/user/activechats/', uuid]);
      });
  }
  unselectChat() {
    this.selectedChat = null;
    this.router.navigate(['/user/activechats']);
  }

  onFileSelected(event: any) {
    this.image = event.target.files[0];
    if (this.image) {
      this.uploadImage();
    }
  }

  public uploadImage() {
    if (!this.image) {
      return;
    }

    const formData = new FormData();
    formData.append('image', this.image); // 'image' debe coincidir con el FileInterceptor del backend

    this.subscription = this.commonServices
      .UploadedFile(formData)
      .pipe(
        map((res: any) => {
          this.urlImage = res.data.cloudinary_url;
          this.isUploaded = true;
          this.primeMessages.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Imagen subida exitosamente',
            life: 3000,
          });
        }),
        catchError((err: HttpErrorResponse) => {
          console.error('Error al subir imagen:', err);

          let errorMessage = 'No se pudo subir la imagen';

          // Manejar diferentes tipos de errores
          if (err.error && err.error.message) {
            errorMessage = err.error.message;
          } else if (err.status === 0) {
            errorMessage = 'Error de conexión con el servidor';
          } else if (err.status === 413) {
            errorMessage = 'La imagen es demasiado grande';
          } else if (err.status === 400) {
            errorMessage = 'Formato de imagen no válido';
          }

          this.primeMessages.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
            life: 5000,
          });

          return throwError(() => err); // Forma moderna de throwError
        })
      )
      .subscribe({
        next: (result) => {
          // Este observer maneja los eventos exitosos
        },
        error: (error) => {
          // Este observer maneja errores no capturados
          console.error('Error no manejado:', error);
        },
      });
  }

  sendMessage() {
    if (this.selectedChat) {
      const isOwner =
        this.selectedChat.request?.requestVehicle?.idOwner === this.userUUID;
      const message: Message = {
        idChat: this.selectedChat.uuid || '',
        description: this.newMessage,
        idSender: this.userUUID,
        image: this.isUploaded ? this.urlImage : null,
        sendDate: new Date(),
        status: true,
        idReceiver: isOwner
          ? this.selectedChat.request?.idClient || ''
          : this.selectedChat.request?.requestVehicle?.idOwner || '',
      };
      this.notification.idUser = isOwner
        ? this.selectedChat.request?.idClient || ''
        : this.selectedChat.request?.requestVehicle?.idOwner || '';
      this.notification.description = `${
        isOwner
          ? this.selectedChat.request?.requestVehicle?.ownerVehicle?.firstName +
            ' ' +
            this.selectedChat.request?.requestVehicle?.ownerVehicle?.lastName
          : this.selectedChat.request?.requestUser?.firstName +
            ' ' +
            this.selectedChat.request?.requestUser?.lastName
      } te ha enviado un mensaje` ;
      this.notification.idRelated = this.selectedChat.uuid;
      this.subscription = this.messageService
        .createMessage(message)
        .pipe(
          map((res: any) => {
            console.log('Mensaje enviado:', res);
            this.getChats();
            this.router
              .navigateByUrl(`/user/activechats/${this.selectedChat?.uuid}`, {
                skipLocationChange: true,
              })
              .then(() => {
                this.router.navigate([
                  '/user/activechats/',
                  this.selectedChat?.uuid,
                ]);
              });
              this.createNotification();
          }),
          catchError((error) => {
            console.error('Error al enviar el mensaje:', error);
            return [];
          })
        )
        .subscribe(observatorAny);
      this.newMessage = '';
      this.urlImage = '';
    }
  }

  getFilteredUsers() {
    if (!this.searchTerm) {
      return this.getChatBySection();
    }
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    return this.chats.filter(
      (chat) =>
        chat.request?.requestVehicle?.detailsVehicle?.brand
          .toLowerCase()
          .includes(lowerCaseSearchTerm) ||
        chat.request?.requestVehicle?.detailsVehicle?.model
          .toLowerCase()
          .includes(lowerCaseSearchTerm) ||
        chat.request?.requestVehicle?.plate
          .toLowerCase()
          .includes(lowerCaseSearchTerm)
    );
  }

  onContextMenu(event: any, messageUUID: string) {
    this.cm.target = event.currentTarget;
    this.cm.show(event);
    this.selectedMessageUUID = messageUUID;
  }

  public changeStatusMessage(uuid: string, status: boolean) {
    this.subscription = this.messageService
      .changeStatusMessage(uuid, status)
      .pipe(
        map((res: any) => {
          console.log('Estado del mensaje actualizado:', res);
          this.getChats();
          this.router
            .navigateByUrl(`/user/activechats/${this.selectedChat?.uuid}`, {
              skipLocationChange: true,
            })
            .then(() => {
              this.router.navigate([
                '/user/activechats/',
                this.selectedChat?.uuid,
              ]);
            });
        }),
        catchError((error) => {
          console.error('Error al cambiar el estado del mensaje:', error);
          return [];
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(observatorAny);
  }

  public changeDescriptionMessage(uuid: string, description: string) {
    console.log('UUID del mensaje:', uuid);
    this.subscription = this.messageService
      .changeDescriptionMessage(uuid, description)
      .pipe(
        map((res: any) => {
          console.log('Descripción del mensaje actualizada:', res);
          this.getChats();
          this.router
            .navigateByUrl(`/user/activechats/${this.selectedChat?.uuid}`, {
              skipLocationChange: true,
            })
            .then(() => {
              this.router.navigate([
                '/user/activechats/',
                this.selectedChat?.uuid,
              ]);
            });
          this.visible = false;
        }),
        catchError((error) => {
          console.error('Error al cambiar la descripción del mensaje:', error);
          return [];
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(observatorAny);
    this.newMessage = '';
  }

  public finalizeNegotition(uuidRequest: string) {
    if (
      !this.deliveryDate ||
      !this.returnDate ||
      this.deliveryDate > this.returnDate
    ) {
      this.primeMessages.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail:
          'Por favor, seleccione las fechas de entrega y devolución, y asegúrese de que la fecha de entrega sea anterior a la fecha de devolución.',
        life: 3000,
      });
      return;
    }

    this.subscription = this.RequestsService.updateRequest({
      uuid: uuidRequest,
      status: 'approved',
      deliveryDate: this.deliveryDate,
      returnDate: this.returnDate,
      idClient: this.selectedChat?.request?.idClient || '',
      idVehicle: this.selectedChat?.request?.idVehicle || '',
      description: this.selectedChat?.request?.description || '',
      answerDate: this.selectedChat?.request?.answerDate || new Date(),
      sendDate: this.selectedChat?.request?.sendDate || new Date(),
    })
      .pipe(
        map((res: any) => {
          console.log('Negociación finalizada:', res);
          this.getChats();
          this.primeMessages.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Negociación finalizada exitosamente',
            life: 3000,
          });
          this.createService(uuidRequest);
        }),
        catchError((error) => {
          console.error('Error al finalizar la negociación:', error);
          this.primeMessages.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo finalizar la negociación',
            life: 5000,
          });
          return [];
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
    this.subscription = this.servicerRentService
      .createServiceRent(service)
      .pipe(
        map((res: any) => {
          console.log(res);
          const request = this.selectedChat?.request;
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
    this.subscription = this.contractsService
      .createContract(this.contractService)
      .pipe(
        map((res: any) => {
          this.isCreatingContract = false; // Restablece el estado al finalizar
          this.primeMessages.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Has aceptado los términos y condiciones de manera exitosa',
            life: 3000,
          });
        }),
        catchError((err) => {
          this.isCreatingContract = false; // Restablece el estado en caso de error
          this.primeMessages.add({
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

  public createNotification() {
    this.subscription = this.notificationsService
      .createNotifications(this.notification)
      .pipe(
        map((res: any) => {
          console.log('Notificación creada:', res);
        }),
        catchError((err) => {
          this.isCreatingContract = false; // Restablece el estado en caso de error
          return throwError(() => err);
        }),
        finalize(() => {
          this.isCreatingContract = false;
        })
      )
      .subscribe(observatorAny);
  }
}
