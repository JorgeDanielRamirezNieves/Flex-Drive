import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, map, Subscription } from 'rxjs';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle';
import { observatorAny } from '../../../../core/tipo-any';

@Component({
  selector: 'app-myvehicles',
  standalone: false,
  templateUrl: './myvehicles.component.html',
  styleUrl: './myvehicles.component.css',
})
export class MyvehiclesComponent implements OnDestroy, OnInit {
  private suscribe: Subscription;
  public tmp: any;
  public userUUID: string;
  public vehicles: Vehicle[] | undefined;
  public complete: boolean = false;

  formData: any = {
    tipoTerreno: '',
    traccion: '',
  };

  submitted: boolean = false;

  constructor(private router: Router, private vehicleService: VehicleService) {
    this.suscribe = this.tmp;
    this.userUUID = localStorage.getItem('userUUID') || '';
  }

  ngOnInit(): void {
    this.getVehiclesUser();
  }

  ngOnDestroy(): void {
    if (this.suscribe) {
      this.suscribe.unsubscribe();
    }
  }

  onSubmit(form: NgForm): void {
    this.submitted = true;

    if (form.valid) {
      console.log('Formulario válido. Redirigiendo...');
      console.log(this.formData);
      this.router.navigate(['/user']);
    } else {
      console.log('Formulario inválido');
    }
  }

  showForm: boolean = false;
  showFormC: boolean = false;

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  toggleFormC(): void {
    this.showFormC = !this.showFormC;
  }

  showDialog = false;

  onSubmitP(form: NgForm) {
    if (form.valid) {
      console.log('Se envió el formulario del vehículo');
      this.showDialog = true;
    } else {
      console.log('Formulario inválido');
    }
  }

  private getVehiclesUser() {
    this.suscribe = this.vehicleService
      .getVehicleByUser(this.userUUID)
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
