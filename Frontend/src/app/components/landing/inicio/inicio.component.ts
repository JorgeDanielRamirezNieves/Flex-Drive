import { Component, OnInit } from '@angular/core';

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

  constructor() {
    this.ciudades = ['Bogota', 'Medellin', 'Cali', 'Barranquilla', 'Cartagena'];
    this.ciudadSeleccionada = '';
    this.fechasSeleccionadas = [];
    this.mostrarBtn = false;
  }

  public checkStatus(): void {
    this.mostrarBtn = this.ciudadSeleccionada !== '' && this.fechasSeleccionadas[1] !== undefined && this.fechasSeleccionadas[1] !== null;
  }
}
