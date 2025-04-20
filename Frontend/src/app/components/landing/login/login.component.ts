import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private router: Router) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Formulario válido. Redirigiendo...');
      this.router.navigate(['/landing']);
    } else {
      console.log('Formulario inválido');
    }
  }
}
