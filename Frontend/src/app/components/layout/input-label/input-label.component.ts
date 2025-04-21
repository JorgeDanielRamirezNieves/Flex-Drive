import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-input-label',
  standalone: false,
  templateUrl: './input-label.component.html',
  styleUrl: './input-label.component.css',

  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class InputLabelComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() type: string = 'text';
  @Input() model: any = {};
  @Input() modelProperty: string = '';

  @Output() modelChange = new EventEmitter<any>();
  @Output() fileSelected = new EventEmitter<File>();

  @Input() submitted: boolean = false;

  showPassword: boolean = false;

  get inputType(): string {
    return this.type === 'password' && this.showPassword ? 'text' : this.type;
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  updateModel(value: any) {
    if (this.model && this.modelProperty) {
      this.model[this.modelProperty] = value;
      this.modelChange.emit(this.model);
    }
  }
}
