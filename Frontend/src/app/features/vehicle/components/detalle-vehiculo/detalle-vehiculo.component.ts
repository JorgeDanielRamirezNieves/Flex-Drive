import { RequestsService } from './../../../requests/services/requests.service';
import { MessageService } from 'primeng/api';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle';
import { Price } from '../../models/price';
import { catchError, finalize, map, Subscription, throwError } from 'rxjs';
import { observatorAny } from '../../../../core/tipo-any';
import { Soat } from '../../models/soat';
import { Tecnomecanic } from '../../models/tecnomecanic';
import { jwtDecode } from 'jwt-decode';
import { Request } from '../../../requests/models/request';
import { NotificationsService } from '../../../notifications/services/notifications.service';
import { Notification } from '../../../notifications/models/notification';

@Component({
  selector: 'app-detalle-vehiculo',
  standalone: false,
  templateUrl: './detalle-vehiculo.component.html',
  styleUrl: './detalle-vehiculo.component.css',
})
export class DetalleVehiculoComponent implements OnInit, OnDestroy {
  public vehicle: Vehicle;
  public price: Price | undefined;
  public soat: Soat | undefined;
  public tecnomecanic: Tecnomecanic | undefined;
  public suscribe: Subscription;
  public tmp: any;
  public complete: boolean;
  public userUUID: string;
  public token: any;
  public isOwner: boolean;
  public visibleDelete: boolean;
  public visibleRequest: boolean;
  public requests: Request;
  public minDate: Date = new Date();
  public deliveryDate: Date | null = null;
  public returnDate: Date | null = null;
  public notification: Notification;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private vehicleService: VehicleService,
    private requestsService: RequestsService,
    private notificationsService: NotificationsService
  ) {
    this.suscribe = this.tmp;
    this.token = jwtDecode(localStorage.getItem('authToken') || '');
    this.userUUID = this.token.uuid;
    this.isOwner = false;
    this.vehicle = new Vehicle(
      '',
      '',
      '',
      'in_use',
      '',
      '',
      0,
      '',
      [],
      0,
      0,
      [],
      '',
      0,
      false,
      new Date(),
      new Date(),
      '',
      ''
    );
    this.complete = false;
    this.visibleDelete = false;
    this.visibleRequest = false;
    this.requests = new Request(
      new Date(),
      null,
      new Date(),
      new Date(),
      '',
      this.userUUID,
      this.activeRouter.snapshot.params['uuid'],
      'pending'
    );
    this.notification = new Notification(
      '',
      new Date(),
      null,
      new Date(),
      null,
      true,
      'c0f2a1b4-3d8e-4f5b-9a6c-7d0e5f1a2b8d',
      ''
    );
  }

  ngOnDestroy(): void {
    if (this.suscribe) {
      this.suscribe.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getVehicle();
  }

  public sendRequest() {
    if (!this.deliveryDate || !this.returnDate) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos incompletos',
        detail: 'Por favor, complete todos los campos requeridos.',
      });
      return;
    }

    if (
      this.deliveryDate < this.minDate ||
      this.returnDate < this.minDate ||
      this.deliveryDate > this.returnDate
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Fecha inválida',
        detail: 'La fecha de entrega y devolución no puede ser anterior a hoy.',
      });
      return;
    }

    if (this.requests.description.trim() === '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Descripción requerida',
        detail: 'Por favor, ingrese una descripción para la solicitud.',
      });
      return;
    }

    this.requests.deliveryDate = this.deliveryDate;
    this.requests.returnDate = this.returnDate;
    this.suscribe = this.requestsService
      .createRequest(this.requests)
      .pipe(
        map((res: any) => {
          console.log('Solicitud enviada', res);
          this.messageService.add({
            severity: 'success',
            summary: 'Solicitud enviada',
            detail: 'La solicitud se ha enviado correctamente.',
          });
          this.createNotification(res.uuid);
          this.router.navigate(['/requests']);
        }),
        catchError((err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al enviar la solicitud',
            detail: err.error.message || 'Error desconocido',
          });
          throw new Error(err);
        })
      )
      .subscribe(observatorAny);
  }

  private getVehicle() {
    this.suscribe = this.vehicleService
      .getVehicleByUUID(this.activeRouter.snapshot.params['uuid'])
      .pipe(
        map((res: any) => {
          this.vehicle = res;
          if (this.vehicle.idOwner === this.userUUID) {
            this.isOwner = true;
          }
          this.price = this.vehicle.prices?.reduce((prev, current) => {
            return new Date(prev.endDate) > new Date(current.endDate)
              ? prev
              : current;
          }, this.vehicle.prices[0]);
          this.soat = this.vehicle.soatVehicle?.reduce((prev, current) => {
            return new Date(prev.finishDate) > new Date(current.finishDate)
              ? prev
              : current;
          }, this.vehicle.soatVehicle[0]);
          this.tecnomecanic = this.vehicle.TecnomecanicVehicle?.reduce(
            (prev, current) => {
              return new Date(prev.expirationDate) >
                new Date(current.expirationDate)
                ? prev
                : current;
            },
            this.vehicle.TecnomecanicVehicle[0]
          );
        }),
        catchError((err) => {
          throw new Error(err);
        }),
        finalize(() => {
          this.complete = true;
        })
      )
      .subscribe(observatorAny);
  }

  public deleteVehicle() {
    this.suscribe = this.vehicleService
      .changeStatusVehicle(this.vehicle.uuid || '', 'inactive')
      .pipe(
        map((res: any) => {
          setTimeout(() => {
            this.router.navigate(['/vehicles/myvehicles']);
          }, 1000);
        }),
        catchError((err) => {
          throw new Error(err);
        })
      )
      .subscribe(observatorAny);
  }

  public createNotification(uuidRequest: string) {
    this.notification.idUser = this.vehicle.idOwner;
    this.notification.description = `Nueva solicitud de alquiler para el vehículo ${this.vehicle.detailsVehicle?.brand} ${this.vehicle.detailsVehicle?.model}`;
    this.notification.idRelated = uuidRequest;
    this.suscribe = this.notificationsService
      .createNotifications(this.notification)
      .pipe(
        map((res: any) => {
          console.log('Notificación creada:', res);
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      )
      .subscribe(observatorAny);
  }
}
