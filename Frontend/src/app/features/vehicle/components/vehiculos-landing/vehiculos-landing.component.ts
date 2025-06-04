import { VehicleService } from './../../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vehicle } from '../../models/vehicle';
import { catchError, finalize, map, Subscription } from 'rxjs';
import { observatorAny } from '../../../../core/tipo-any';

@Component({
  selector: 'app-vehiculos-landing',
  standalone: false,
  templateUrl: './vehiculos-landing.component.html',
  styleUrl: './vehiculos-landing.component.css',
})
export class VehiculosLandingComponent implements OnInit, OnDestroy {
  public tiposBusqueda: string[];
  public tipoBusquedaSeleccionado: string;
  public vehicles: Vehicle[];
  public busqueda: string;
  public searching: boolean;
  public suscribeVehicles: Subscription;
  public tmp: any;
  public complete: boolean;
  public brands: any[];

  constructor(private router: Router, private VehicleService: VehicleService) {
    this.busqueda = '';
    this.suscribeVehicles = this.tmp;
    this.complete = false;
    this.searching = false;
    this.brands = [];
    this.tiposBusqueda = [
      'Por nombre',
      'Por marca',
      'Por modelo',
      'Por año',
      'Por precio',
      'Por kilometraje',
    ];
    this.vehicles = [];
    this.tipoBusquedaSeleccionado = this.tiposBusqueda[0];
  }
  ngOnDestroy(): void {
    if (this.suscribeVehicles) {
      this.suscribeVehicles.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getVehiclesMostRequested();
    this.getBrands();
  }

  public search(form: NgForm) {
    this.searching = true;
    setTimeout(() => {
      this.searching = false;
      this.router.navigate(['/vehicles/search'], {
        queryParams: {
          tipo: this.tipoBusquedaSeleccionado,
          busqueda: this.busqueda,
        },
      });
    }, 1000);
  }

  public searchBrand(brand: string) {
    this.searching = true;
    setTimeout(() => {
      this.searching = false;
      this.router.navigate(['/vehicles/search'], {
        queryParams: {
          tipo: 'Por marca',
          busqueda: brand,
        },
      });
    }, 1000);
  }

  private getVehiclesMostRequested() {
    this.suscribeVehicles = this.VehicleService.getVehicleMostRequested(8)
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

  private getBrands() {
    this.suscribeVehicles = this.VehicleService.getBrands()
      .pipe(
        map((res: any) => {
          this.brands = res;
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
