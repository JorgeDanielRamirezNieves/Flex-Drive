import { ServiceRentService } from './../../services/service-rent.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Service } from '../../models/service';
import { catchError, finalize, map, Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { observatorAny } from '../../../../core/tipo-any';

@Component({
  selector: 'app-view-all',
  standalone: false,
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.css',
})
export class ViewAllComponent implements OnInit, OnDestroy {  
  public services: Service[];
  public servicesFinished: Service[];
  private suscribe: Subscription;
  public tmp: any;
  public userUUID: string;
  public token: any;
  public role: string;
  public complete: boolean = false;

  constructor(private serviceRentService: ServiceRentService) {
    this.services = [];
    this.servicesFinished = [];
    this.token = jwtDecode(localStorage.getItem('authToken') || '');
    this.userUUID = this.token.uuid;
    this.suscribe = this.tmp;
    this.role = this.token.rolUser.name;
  }

  ngOnInit(): void {
    this.getServices();

    // Filter services by status
  }

  ngOnDestroy(): void {
    if (this.suscribe) {
      this.suscribe.unsubscribe();
    }
  }

  private getServices() {
    this.suscribe = this.serviceRentService
      .getServiceRentsByClientUUID(this.userUUID)
      .pipe(
        map((res: any) => {
          res.forEach((service: Service) => {
            if (service.status === 'finished') {
              this.servicesFinished.push(service);
            } else {
              this.services.push(service);
            }
          });
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
