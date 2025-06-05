import { HttpClient } from '@angular/common/http';
import { URL_TYPE_SALE } from './../../../core/domains';
import { Injectable } from '@angular/core';
import { TypeSale } from '../models/type-sale';

@Injectable({
  providedIn: 'root'
})
export class TypeSalesService {
  public urlTypeSales: string;
  public token: any;
  constructor(private http: HttpClient) { 
    this.urlTypeSales = URL_TYPE_SALE;
    if (localStorage.getItem('authToken')) {
      this.token = localStorage.getItem('authToken');
    }
  }

  public getTypeSales() {
    return this.http.get<TypeSale[]>(this.urlTypeSales + 'findAll', {
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }
}
