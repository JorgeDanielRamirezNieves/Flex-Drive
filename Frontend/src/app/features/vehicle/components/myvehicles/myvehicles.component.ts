import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, map, Subscription } from 'rxjs';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle';
import { observatorAny } from '../../../../core/tipo-any';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from 'primeng/api';

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
  public token: any;
  public vehicles: Vehicle[] | undefined;
  public complete: boolean = false;
  public plate: any;
  showForm: boolean = false;
  showFormC: boolean = false;

  constructor(
    private router: Router,
    private vehicleService: VehicleService,
    private messageService: MessageService
  ) {
    this.suscribe = this.tmp;
    this.token = jwtDecode(localStorage.getItem('authToken') || '');
    this.userUUID = this.token.uuid;
    this.plate = {
      value: '',
    };
  }

  ngOnInit(): void {
    this.getVehiclesUser();
  }

  ngOnDestroy(): void {
    if (this.suscribe) {
      this.suscribe.unsubscribe();
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
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

  public onPress(){
    this.plate.value = this.plate.value.toUpperCase();
  }

  public createVehicle(form: NgForm) {
    if (!form.valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Llena la placa antes de continuar',
        life: 3000,
      });
    }
    const regex = /^[A-Z]{3}[0-9]{3}$/; // Adjust regex as needed for your plate format
    if (!regex.test(this.plate.value)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Placa no válida, debe contener solo letras y números',
        life: 3000,
      });
      return;
    }
    this.router.navigate(['/vehicles/createVehicle/' + this.plate.value]);
  }
}
