import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userData = {
    password: '',
    email: '',
  };

  constructor(private router: Router, private authService: AuthService) {
    window.scrollTo(0, 0)
  }

  submitted = false;

  onSubmit(form: NgForm): void {
    this.submitted = true;

    if (form.valid) {
      this.authService
        .login(this.userData.email, this.userData.password)
        .subscribe({
          next: (respuesta) => {
            if (respuesta.status === 200) {
              this.router.navigate(['/landing']);
              console.log(respuesta.response.tokenApp);
            }
            if (respuesta.status === 406) {
              alert(`Contraseña Incorrecta`);
            }
            if (respuesta.status === 409) {
              alert(`El ususario no se encuentra registrado`);
            }
          },
          error: (err: HttpErrorResponse) => {
            alert(`Error: ${err.message}`);
            console.error('Detalles del error:', err);
          },
        })
    }
  }
}
