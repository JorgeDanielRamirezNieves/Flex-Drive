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
  public codOTP: string;
  public codOTPgenerated: string;
  public remainingTime: number;
  private suscribe: Subscription;
  public tmp: any;
  public userUUID: string;
  public token: any;
  public role: string;
  public complete: boolean = false;
  public price: Price | undefined;
  public soat: Soat | undefined;
  public tecnomecanic: Tecnomecanic | undefined;
  public deliveryDate: Date
  public returnDate: Date
  public isOwner: boolean;

  constructor(
    private serviceRentService: ServiceRentService,
    private activeRouter: ActivatedRoute
  ) {
    this.codOTP = '';
    this.remainingTime = 30;
    this.codOTPgenerated = this.simulateOTP();
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
    this.countDownOTP();
    if (this.userUUID === this.service?.request?.requestVehicle?.ownerVehicle?.uuid) {
      this.isOwner = true;
    }
  }

  public simulateOTP() {
    // Simulate OTP generation
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    this.codOTPgenerated = generatedOTP;
    return generatedOTP;
  }

  public countDownOTP() {
    let remainingTime = this.remainingTime;

    setInterval(() => {
      if (remainingTime <= 1) {
        remainingTime = 30;
        this.codOTPgenerated = this.simulateOTP();
      } else {
        remainingTime--;
        this.remainingTime = remainingTime;
      }
    }, 1000);
  }

  private getService() {
    this.suscribe = this.serviceRentService
      .getServiceRentsByUUID(this.activeRouter.snapshot.params['uuid'])
      .pipe(
        map((res: any) => {
          this.service = res;
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
          this.deliveryDate = this.service?.request?.deliveryDate ? new Date(this.service.request.deliveryDate) : new Date();
          this.returnDate = this.service?.request?.returnDate ? new Date(this.service.request.returnDate) : new Date();
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
}
