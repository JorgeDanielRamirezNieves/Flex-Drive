import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pqrs',
  standalone: false,
  templateUrl: './pqrs.component.html',
  styleUrl: './pqrs.component.css',
})
export class PqrsComponent {
  formData: any = {
    tipoDePeticion: '',
  };
  constructor(private router: Router) {}

  submitted: boolean = false;

  onSubmit(form: NgForm): void {
    this.submitted = true;

    if (form.valid) {
      console.log('Formulario válido. Redirigiendo...');
      console.log(this.formData);
      this.router.navigate(['/user']);
    } else {
      console.log('Formulario inválido');
    }
  }
}
