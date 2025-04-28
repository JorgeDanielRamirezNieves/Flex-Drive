import { Component } from '@angular/core';

@Component({
  selector: 'app-vehiculos-landing',
  standalone: false,
  templateUrl: './vehiculos-landing.component.html',
  styleUrl: './vehiculos-landing.component.css'
})
export class VehiculosLandingComponent {
  public tiposBusqueda: string[];
  public tipoBusquedaSeleccionado: string;
  public vehiculos: any[];


  constructor() {
    this.tiposBusqueda =  [
      'Por nombre',
      'Por marca',
      'Por modelo',
      'Por año',
      'Por precio',
      'Por kilometraje',
    ];
    this.vehiculos = [
      {
        id: 1,
        nombre: 'Vehículo 1',
        marca: 'Marca 1',
        modelo: 'Modelo 1',
        año: 2020,
        precio: 20000,
        kilometraje: 15000,
      },
      {
        id: 2,
        nombre: 'Vehículo 2',
        marca: 'Marca 2',
        modelo: 'Modelo 2',
        año: 2019,
        precio: 18000,
        kilometraje: 20000,
      },
      {
        id: 3,
        nombre: 'Vehículo 3',
        marca: 'Marca 3',
        modelo: 'Modelo 3',
        año: 2021,
        precio: 25000,
        kilometraje: 10000,
      },
      {
        id: 4,
        nombre: 'Vehículo 4',
        marca: 'Marca 4',
        modelo: 'Modelo 4',
        año: 2018,
        precio: 15000,
        kilometraje: 30000,
      },
      {
        id: 5,
        nombre: 'Vehículo 5',
        marca: 'Marca 5',
        modelo: 'Modelo 5',
        año: 2022,
        precio: 30000,
        kilometraje: 5000,
      },
      {
        id: 6,
        nombre: 'Vehículo 6',
        marca: 'Marca 6',
        modelo: 'Modelo 6',
        año: 2017,
        precio: 12000,
        kilometraje: 40000,
      },
      {
        id: 7,
        nombre: 'Vehículo 7',
        marca: 'Marca 7',
        modelo: 'Modelo 7',
        año: 2023,
        precio: 35000,
        kilometraje: 2000,
      },
      {
        id: 8,
        nombre: 'Vehículo 8',
        marca: 'Marca 8',
        modelo: 'Modelo 8',
        año: 2016,
        precio: 10000,
        kilometraje: 50000,
      }
    ];
    this.tipoBusquedaSeleccionado = this.tiposBusqueda[0];
  }
}
