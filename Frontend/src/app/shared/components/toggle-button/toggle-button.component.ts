import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  standalone: false,
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.css',
})
export class ToggleButtonComponent {
  @Input() toggleType: 'simple' | 'icon' | 'text' = 'simple';
  @Input() labels: string[] = ['On', 'Off']; // Usado para texto
  @Input() icons: string[] = ['sun', 'moon']; // Usado para iconos (nombres de clases o fuentes)
  @Input() value: boolean = false;

  @Output() valueChange = new EventEmitter<boolean>();

  toggle() {
    this.value = !this.value;
    console.log('Nuevo valor del boton:', this.value);
    this.valueChange.emit(this.value);
  }
}
