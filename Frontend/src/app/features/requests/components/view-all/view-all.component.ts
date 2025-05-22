import { Component } from '@angular/core';
import { Request } from '../../models/request';
import { RequestsService } from '../../services/requests.service';
import { catchError, finalize, map, Subscription } from 'rxjs';
import { observatorAny } from '../../../../core/tipo-any';

@Component({
  selector: 'app-view-all',
  standalone: false,
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.css',
})
export class ViewAllComponent {
  private suscribe: Subscription;
  public tmp: any;
  public requestsClient: Request[] | undefined;
  public requestsOwner: Request[] | undefined;
  public selectedRequest: any | null = null;
  public loadingRequests: boolean;
  public userUUID: string;
  public role: string;

  constructor(private requestService: RequestsService) {
    this.loadingRequests = true;
    this.suscribe = this.tmp;
    this.userUUID = localStorage.getItem('userUUID') || '';
    this.role = localStorage.getItem('role') || '';
  }

  ngOnInit(): void {
    console.log(this.userUUID);
    this.getRequestsByClient();
    this.getRequestsByOwner();
  }

  ngOnDestroy(): void {
    if (this.suscribe) {
      this.suscribe.unsubscribe();
    }
  }

  private getRequestsByClient() {
    this.suscribe = this.requestService
      .getByClient(this.userUUID)
      .pipe(
        map((res: any) => {
          this.requestsClient = res;
        }),
        catchError((err) => {
          throw new Error(err);
        }),
        finalize(() => {
          this.loadingRequests = false;
        })
      )
      .subscribe(observatorAny);
  }
  
  private getRequestsByOwner() {
    this.suscribe = this.requestService
      .getByOwner(this.userUUID)
      .pipe(
        map((res: any) => {
          console.log(res);
          this.requestsOwner = res;
        }),
        catchError((err) => {
          throw new Error(err);
        }),
        finalize(() => {
          this.loadingRequests = false;
        })
      )
      .subscribe(observatorAny);
  }
}
