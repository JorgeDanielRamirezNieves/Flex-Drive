import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  selectedDocument: string = 'cc';
  agreeTerms: boolean = false;

  constructor(private router: Router) { }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Formulario válido. Redirigiendo...');
      this.router.navigate(['/landing']);
    } else {
      console.log('Formulario inválido');
    }
  }
}
