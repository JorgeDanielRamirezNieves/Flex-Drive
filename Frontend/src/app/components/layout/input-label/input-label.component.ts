import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-label',
  standalone: false,
  templateUrl: './input-label.component.html',
  styleUrl: './input-label.component.css',
})
export class InputLabelComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() name: string = '';

  showPassword: boolean = false;

  get inputType(): string {
    return this.type === 'password' && this.showPassword ? 'text' : this.type;
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
