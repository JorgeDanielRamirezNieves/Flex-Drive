import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { catchError, finalize, map, Subscription } from 'rxjs';
import { User } from '../../models/user';
import { Vehicle } from '../../../vehicle/models/vehicle';
import { observatorAny } from '../../../../core/tipo-any';
import { VehicleService } from '../../../vehicle/services/vehicle.service';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit, OnDestroy {
  private suscribe: Subscription;
  public tmp: any;
  public userUUID: string;
  public role: string;
  public user: User | undefined;
  public vehicles: Vehicle[] | undefined;
  public complete: boolean = false;
  constructor(private userService: UserService, private vehicleService: VehicleService) {
    this.suscribe = this.tmp;
    this.userUUID = localStorage.getItem('userUUID') || '';
    this.role = localStorage.getItem('role') || '';
  }

  ngOnDestroy(): void {
    if (this.suscribe) {
      this.suscribe.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getUser();
    this.getVehiclesUser();
  }

  private getUser() {
    this.suscribe = this.userService
      .getUserByUUID(this.userUUID)
      .pipe(
        map((res: any) => {
          this.user = res;
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
