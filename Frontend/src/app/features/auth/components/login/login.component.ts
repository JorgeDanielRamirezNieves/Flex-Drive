import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userData: any = {
    password: '',
    email: '',
  };

  constructor(private router: Router) {}

  submitted = false;

  onSubmit(form: NgForm): void {
    this.submitted = true;

    if (form.valid) {
      console.log(this.userData);
      this.router.navigate(['/landing']);
    } else {
      console.log('Formulario inválido');
    }
  }
}
