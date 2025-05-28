import { Injectable } from '@angular/core';
import { URL_CONTRACT } from '../../../core/domains';
import { HttpClient } from '@angular/common/http';
import { Contract } from '../models/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {
  private urlContract:string;
  constructor(private http: HttpClient) { 
    this.urlContract = URL_CONTRACT
  }

  public createContract(objContract: Contract) {
    return this.http.post<any>(this.urlContract + 'add', objContract);
  }
}
