import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myvehicles',
  standalone: false,
  templateUrl: './myvehicles.component.html',
  styleUrl: './myvehicles.component.css',
})
export class MyvehiclesComponent {
  formData: any = {
    tipoTerreno: '',
    traccion: '',
  };

  submitted: boolean = false;

  constructor(private router: Router) {}

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

  showForm: boolean = false;
  showFormC: boolean = false;

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  toggleFormC(): void {
    this.showFormC = !this.showFormC;
  }

  showDialog = false;

  onSubmitP(form: NgForm) {
    if (form.valid) {
      console.log('Se envió el formulario del vehículo');
      this.showDialog = true;
    } else {
      console.log('Formulario inválido');
    }
  }
}
