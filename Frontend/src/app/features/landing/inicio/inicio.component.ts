import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from '../../vehicle/models/vehicle';
import { catchError, finalize, map, Subscription } from 'rxjs';
import { VehicleService } from '../../vehicle/services/vehicle.service';
import { observatorAny } from '../../../core/tipo-any';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit, OnDestroy {
  public ciudades: string[];
  public ciudadSeleccionada: string;
  public fechasSeleccionadas: Date[];
  public complete: boolean;
  public mostrarBtn: boolean;
  public searching: boolean;
  public vehicles: Vehicle[];
  public suscribeVehicles: Subscription;
  public tmp: any;
  public minDate: Date = new Date();

  constructor(private router: Router, private vehicleService: VehicleService) {
    window.scrollTo(0, 0)
    this.ciudades = ['Bogota', 'Medellin', 'Cali', 'Barranquilla', 'Cartagena'];
    this.ciudadSeleccionada = '';
    this.fechasSeleccionadas = [];
    this.mostrarBtn = false;
    this.searching = false;
    this.vehicles = [];
    this.suscribeVehicles = this.tmp;
    this.complete = false;
  }

  ngOnDestroy(): void {
    if (this.suscribeVehicles) {
      this.suscribeVehicles.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getVehiclesLanding();
  }

  public checkStatus(): void {
    this.mostrarBtn =
      this.ciudadSeleccionada !== '' &&
      this.fechasSeleccionadas[1] !== undefined &&
      this.fechasSeleccionadas[1] !== null;
  }

  public search(): void {
    this.searching = true;
    setTimeout(() => {
      this.searching = false;
      this.router.navigate(['/vehiculos/search'], {
        queryParams: {
          ciudad: this.ciudadSeleccionada,
          fechaInicio: this.fechasSeleccionadas[0].toISOString(),
          fechaFin: this.fechasSeleccionadas[1].toISOString(),
        },
      });
    }, 2000);
  }

  private getVehiclesLanding() {
    this.suscribeVehicles = this.vehicleService
      .getVehicleLimit(6)
      .pipe(
        map((res: any) => {
          this.vehicles = res;
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
