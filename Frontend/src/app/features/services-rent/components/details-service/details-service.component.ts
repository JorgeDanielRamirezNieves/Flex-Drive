import { CommonServiceService } from './../../../../shared/services/common-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Service } from '../../models/service';
import { catchError, finalize, map, Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ServiceRentService } from '../../services/service-rent.service';
import { ActivatedRoute } from '@angular/router';
import { observatorAny } from '../../../../core/tipo-any';
import { Price } from '../../../vehicle/models/price';
import { Soat } from '../../../vehicle/models/soat';
import { Tecnomecanic } from '../../../vehicle/models/tecnomecanic';

@Component({
  selector: 'app-details-service',
  standalone: false,
  templateUrl: './details-service.component.html',
  styleUrl: './details-service.component.css',
})
export class DetailsServiceComponent implements OnInit, OnDestroy {
  public service: Service | undefined;
  public codOTPgenerated: string;
  public codOTP: string;
  private suscribe: Subscription;
  public tmp: any;
  public userUUID: string;
  public token: any;
  public role: string;
  public complete: boolean = false;
  public price: Price | undefined;
  public soat: Soat | undefined;
  public tecnomecanic: Tecnomecanic | undefined;
  public deliveryDate: Date;
  public returnDate: Date;
  public isOwner: boolean;

  constructor(
    private serviceRentService: ServiceRentService,
    private activeRouter: ActivatedRoute,
    private commonService: CommonServiceService
  ) {
    this.codOTPgenerated = '';
    this.codOTP = '';
    this.suscribe = this.tmp;
    this.token = jwtDecode(localStorage.getItem('authToken') || '');
    this.userUUID = this.token.uuid;
    this.role = this.token.rolUser.name;
    this.deliveryDate = new Date();
    this.returnDate = new Date();
    this.isOwner = false;
  }

  ngOnDestroy(): void {
    if (this.suscribe) {
      this.suscribe.unsubscribe();
    }
  }

  ngOnInit() {
    this.getService();
  }

  public getOTP() {
    this.suscribe = this.commonService
      .generateOTP()
      .pipe(
        map((res: any) => {
          this.codOTPgenerated = res;
        }),
        catchError((err) => {
          throw new Error(err);
        })
      )
      .subscribe(observatorAny);
  }

  public validateOTP(status: string) {
    this.suscribe = this.commonService
      .validateOTP(this.codOTP)
      .pipe(
        map((res: any) => {
          if (res.status === 200) {
            this.serviceRentService
              .changeServiceRentStatus(
                this.activeRouter.snapshot.params['uuid'],
                status
              )
              .subscribe(observatorAny);
            window.location.reload();
          } else {
            throw new Error('Invalid OTP');
          }
        }),
        catchError((err) => {
          throw new Error(err);
        })
      )
      .subscribe(observatorAny);
  }

  private getService() {
    this.suscribe = this.serviceRentService
      .getServiceRentsByUUID(this.activeRouter.snapshot.params['uuid'])
      .pipe(
        map((res: any) => {
          this.service = res;
          if (
            this.userUUID ===
            this.service?.request?.requestVehicle?.ownerVehicle?.uuid
          ) {
            this.isOwner = true;
          }
          this.price = this.service?.request?.requestVehicle?.prices?.reduce(
            (prev, current) => {
              return new Date(prev.endDate) > new Date(current.endDate)
                ? prev
                : current;
            },
            this.service?.request?.requestVehicle?.prices[0]
          );
          this.soat =
            this.service?.request?.requestVehicle?.soatVehicle?.reduce(
              (prev, current) => {
                return new Date(prev.finishDate) > new Date(current.finishDate)
                  ? prev
                  : current;
              },
              this.service?.request?.requestVehicle?.soatVehicle[0]
            );
          this.tecnomecanic =
            this.service?.request?.requestVehicle?.TecnomecanicVehicle?.reduce(
              (prev, current) => {
                return new Date(prev.expirationDate) >
                  new Date(current.expirationDate)
                  ? prev
                  : current;
              },
              this.service?.request?.requestVehicle?.TecnomecanicVehicle[0]
            );
          this.deliveryDate = this.service?.request?.deliveryDate
            ? new Date(this.service.request.deliveryDate)
            : new Date();
          this.returnDate = this.service?.request?.returnDate
            ? new Date(this.service.request.returnDate)
            : new Date();
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

  public deliverService() {
    this.suscribe = this.serviceRentService
      .changeServiceRentStatus(
        this.activeRouter.snapshot.params['uuid'],
        'for_recive'
      )
      .pipe(
        map((res: any) => {
          window.location.reload();
        }),
        catchError((err) => {
          throw new Error(err);
        })
      )
      .subscribe(observatorAny);
  }
}
