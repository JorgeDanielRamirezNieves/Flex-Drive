import { MessageService } from 'primeng/api';
import { Component, model, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle';
import { Price } from '../../models/price';
import { catchError, finalize, map, Subscription } from 'rxjs';
import { observatorAny } from '../../../../core/tipo-any';
import { Soat } from '../../models/soat';
import { Tecnomecanic } from '../../models/tecnomecanic';

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
  public suscribeVehicles: Subscription;
  public tmp: any;
  public complete: boolean;
  public userUUID: string;
  public isOwner: boolean;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private vehicleService: VehicleService
  ) {
    this.suscribeVehicles = this.tmp;
    this.userUUID = localStorage.getItem('userUUID') || '';
    this.isOwner = false;
    this.vehicle = new Vehicle(
      '',
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
  }

  ngOnDestroy(): void {
    if (this.suscribeVehicles) {
      this.suscribeVehicles.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getVehicle();
  }

  public sendRequest() {
    /* Aqui va la logica que tengamos con el back */
    console.log('Se ha enviado la solicitud al propietario del vehiculo');
    this.messageService.add({
      severity: 'success',
      summary: 'Mensaje enviado',
      detail: 'se envió el mensaje al propietario',
      life: 5000,
    });
    setTimeout(() => {
      this.router.navigate(['/requests']);
    }, 1000);
  }

  private getVehicle() {
    this.suscribeVehicles = this.vehicleService
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
          this.tecnomecanic = this.vehicle.TecnomecanicVehicle?.reduce((prev, current) => {
            return new Date(prev.expirationDate) > new Date(current.expirationDate)
              ? prev
              : current;
          }, this.vehicle.TecnomecanicVehicle[0]);
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
