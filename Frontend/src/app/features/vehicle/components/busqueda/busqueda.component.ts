import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Drawer } from 'primeng/drawer';
import { VehicleService } from '../../services/vehicle.service';
import { catchError, map, Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { observatorAny } from '../../../../core/tipo-any';
import { Vehicle } from '../../models/vehicle';
import { PreferencesService } from '../../../preferences/services/preferences.service';

interface filtro {
  nombre: string;
  checked: boolean;
}
@Component({
  selector: 'app-busqueda',
  standalone: false,
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css',
})
export class BusquedaComponent implements OnInit, OnDestroy {
  public tiposBusqueda: string[];
  public tipoBusquedaSeleccionado: string;
  public marcas: filtro[];
  public modelos: filtro[];
  public anno: filtro[];
  public busqueda: string;
  public drawerVisible: boolean;
  public searching: boolean;
  public suscription: Subscription;
  public tmp: any;
  public vehicles: Vehicle[] = [];
  @ViewChild('drawerRef') drawerRef!: Drawer;

  constructor(
    private router: Router,
    private vehicleService: VehicleService,
    private preferencesService: PreferencesService
  ) {
    this.drawerVisible = false;
    this.searching = false;
    this.busqueda = '';
    this.suscription = this.tmp;
    this.marcas = [
      { nombre: 'Audi', checked: false },
      { nombre: 'BMW', checked: false },
      { nombre: 'Chevrolet', checked: false },
      { nombre: 'Ford', checked: false },
      { nombre: 'Honda', checked: false },
      { nombre: 'Hyundai', checked: false },
      { nombre: 'Kia', checked: false },
      { nombre: 'Mazda', checked: false },
      { nombre: 'Mercedes-Benz', checked: false },
      { nombre: 'Nissan', checked: false },
      { nombre: 'Subaru', checked: false },
      { nombre: 'Toyota', checked: false },
      { nombre: 'Volkswagen', checked: false },
    ];
    this.modelos = [
      { nombre: 'A1', checked: false },
      { nombre: 'A3', checked: false },
      { nombre: 'A4', checked: false },
      { nombre: 'A5', checked: false },
      { nombre: 'A6', checked: false },
      { nombre: 'A7', checked: false },
      { nombre: 'A8', checked: false },
      { nombre: 'Q2', checked: false },
      { nombre: 'Q3', checked: false },
      { nombre: 'Q5', checked: false },
      { nombre: 'Q7', checked: false },
      { nombre: 'Q8', checked: false },
    ];
    this.anno = [
      { nombre: '2020', checked: false },
      { nombre: '2021', checked: false },
      { nombre: '2022', checked: false },
      { nombre: '2023', checked: false },
      { nombre: '2024', checked: false },
      { nombre: '2025', checked: false },
      { nombre: '2026', checked: false },
      { nombre: '2027', checked: false },
      { nombre: '2028', checked: false },
    ];
    this.tiposBusqueda = [
      'Por nombre',
      'Por marca',
      'Por modelo',
      'Por año',
      'Por precio',
      'Por kilometraje',
    ];
    this.tipoBusquedaSeleccionado = this.tiposBusqueda[0];
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {
    // bring the url params
    this.busqueda =
      this.router.url.split('&')[1]?.split('=')[1].replaceAll('-', ' ') || '';
    this.searchVehicles();
  }

  public changeDrawerVisble() {
    this.drawerVisible = !this.drawerVisible;
  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  public search(form: NgForm) {
    this.searching = true;
    setTimeout(() => {
      this.searching = false;
      this.router.navigate(['/vehicles/search'], {
        queryParams: {
          tipo: this.tipoBusquedaSeleccionado,
          busqueda: this.busqueda.replaceAll(' ', '-'),
        },
      });
    }, 1000);
  }

  public searchVehicles() {
    this.searching = true;
    this.busqueda = this.busqueda.trim();
    if (this.busqueda === '') {
      this.searching = false;
      return;
    }
    const token = jwtDecode(localStorage.getItem('authToken') || '') as any;
    const uuidUser = token.uuid;
    this.suscription = this.preferencesService
      .getPreferencesUser(uuidUser)
      .pipe(
        map((res: any) => {
          if (res) {
            this.vehicleService
              .searchVehicles(res.parameters, this.busqueda)
              .pipe(
                map((vehicles: any) => {
                  this.vehicles = vehicles;
                  this.searching = false;
                }),
                catchError((err) => {
                  throw new Error(err);
                })
              )
              .subscribe(observatorAny);
          }
        }),
        catchError((err) => {
          throw new Error(err);
        })
      )
      .subscribe(observatorAny);
  }
}
