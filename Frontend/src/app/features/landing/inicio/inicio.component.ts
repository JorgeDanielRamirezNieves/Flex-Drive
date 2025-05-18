import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  public ciudades: string[];
  public ciudadSeleccionada: string;
  public fechasSeleccionadas: Date[];
  public mostrarBtn: boolean;
  public searching: boolean;

  constructor(private router: Router) {
    this.ciudades = ['Bogota', 'Medellin', 'Cali', 'Barranquilla', 'Cartagena'];
    this.ciudadSeleccionada = '';
    this.fechasSeleccionadas = [];
    this.mostrarBtn = false;
    this.searching = false;
  }

  public checkStatus(): void {
    this.mostrarBtn = this.ciudadSeleccionada !== '' && this.fechasSeleccionadas[1] !== undefined && this.fechasSeleccionadas[1] !== null;
  }

  public search(): void {
    this.searching = true;
    setTimeout(() => {
      this.searching = false;
      this.router.navigate(['/vehiculos/search'], {
        queryParams: {
          ciudad: this.ciudadSeleccionada,
          fechaInicio: this.fechasSeleccionadas[0].toISOString(),
          fechaFin: this.fechasSeleccionadas[1].toISOString()
        }
      });
    }, 2000);
  }
}
